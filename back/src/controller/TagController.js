// Models
const { models } = require('../db/conn');
const Tag = models.Tag;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');
const inserLog = require('../helpers/insertLog');

// Constants
const { HTTP_STATUS } = require('../constants');

class TagController {
    /**
     * Register new tag in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { name } = req.body;

        const fieldError = new Validator(name, 'NOME').nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const tagsExists = await Tag.findOne({ where: { name: name.toUpperCase() } });
        if (tagsExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Tag já cadastrada.' }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Usuário inválido.' }); };

            const tag = await Tag.create({ name: name.toUpperCase(), createdBy: user.id, updatedBy: user.id });
            
            await inserLog({
                order: 'create',
                table: 'Tag',
                data: tag.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Tag cadastrada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Update an existing tag.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async edit(req, res) {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);
        if (!tag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Tag não encontrada.' }); };

        const { name } = req.body;
        const fieldError = new Validator(name, 'NOME').nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const tagsExists = await Tag.findOne({ where: { name: name } });
        if (tagsExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Tag já cadastrada.' }); };

        try {
            const oldTagName = tag.name;
            const user = await getUserByToken(req);

            tag.name = name.toUpperCase();
            tag.updatedBy = user.id;

            await tag.save();
            
            await inserLog({
                order: 'update',
                table: 'Tag',
                oldData: oldTagName,
                data: tag.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Tag atualizada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete an existing tag.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async delete(req, res) {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);
        if (!tag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Tag não encontrada.' }); };

        try {
            const user = await getUserByToken(req);
            await tag.destroy();

            await inserLog({
                order: 'delete',
                table: 'Tag',                
                data: tag.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Tag excluída com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get tags by id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getTagByID(req, res) {
        const { id } = req.params;

        try {
            const tag = await Tag.findByPk(id);
            if (!tag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Tag não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: tag });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all tags in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getAllTag(req, res) {
        try {
            const result = await Tag.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = TagController;