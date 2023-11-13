
// Models
const { models } = require('../db/conn');
const Categorie = models.Categorie;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');
const inserLog = require('../helpers/insertLog');

// Constants
const { HTTP_STATUS } = require('../constants');

class CategorieController {
    /**
     * Register new categorie in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { name } = req.body;
        const fieldError = new Validator(name, 'NOME').nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const categorieExists = await Categorie.findOne({ where: { name: name.toUpperCase() } });
        if (categorieExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Categoria já cadastrada.' }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Usuário inválido.' }); };

            const categorie = await Categorie.create({ name: name.toUpperCase(), createdBy: user.id, updatedBy: user.id });

            await inserLog({
                order: 'create',
                table: 'Categoria',
                data: categorie.name,
                user: user.name
            })


            return res.status(HTTP_STATUS.OK).json({ message: 'Categoria cadastrada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Update an existing categorie.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async edit(req, res) {
        const { id } = req.params;

        const categorie = await Categorie.findByPk(id);
        if (!categorie) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Categoria não encontrada.' }); };

        const { name } = req.body;
        const fieldError = new Validator(name, 'NOME').nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const categorieExists = await Categorie.findOne({ where: { name: name.toUpperCase() } });
        if (categorieExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Categoria já cadastrada.' }); };

        try {
            const oldCategorieName = categorie.name;
            const user = await getUserByToken(req);

            categorie.name = name.toUpperCase();
            categorie.updatedBy = user.id;

            await categorie.save();

            await inserLog({
                order: 'update',
                table: 'Categoria',
                oldData: oldCategorieName,
                data: categorie.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Categoria atualizada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete an existing categorie.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async delete(req, res) {
        const { id } = req.params;

        const categorie = await Categorie.findByPk(id);
        if (!categorie) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Categoria não encontrada.' }); };

        try {
            const user = await getUserByToken(req);
            await categorie.destroy();

            await inserLog({
                order: 'delete',
                table: 'Categoria',
                data: categorie.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Categoria excluída com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get Categorie by id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getCategorieById(req, res) {
        const { id } = req.params;

        try {
            const categorie = await Categorie.findByPk(id);
            if (!categorie) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Cateoria não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: categorie });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all Categorie in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getAllCategorie(req, res) {
        try {
            const categories = await Categorie.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            return res.status(HTTP_STATUS.OK).json({ result: categories });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = CategorieController;