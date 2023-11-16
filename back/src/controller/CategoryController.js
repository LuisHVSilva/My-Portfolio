
// Models
const { models } = require('../db/conn');
const Category = models.Category;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');
const inserLog = require('../helpers/insertLog');

// Constants
const { HTTP_STATUS } = require('../constants');

class CategoryController {
    /**
     * Register new category in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { name } = req.body;
        const fieldError = new Validator(name, 'NOME').nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const categoryExists = await Category.findOne({ where: { name: name.toUpperCase() } });
        if (categoryExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Categoria já cadastrada.' }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Usuário inválido.' }); };

            const category = await Category.create({ name: name.toUpperCase(), createdBy: user.id, updatedBy: user.id });

            await inserLog({
                order: 'create',
                table: 'Categoria',
                data: category.name,
                user: user.name
            })


            return res.status(HTTP_STATUS.OK).json({ message: 'Categoria cadastrada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Update an existing category.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async edit(req, res) {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Categoria não encontrada.' }); };

        const { name } = req.body;
        const fieldError = new Validator(name, 'NOME').nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const categoryExists = await Category.findOne({ where: { name: name.toUpperCase() } });
        if (categoryExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Categoria já cadastrada.' }); };

        try {
            const oldCategoryName = category.name;
            const user = await getUserByToken(req);

            category.name = name.toUpperCase();
            category.updatedBy = user.id;

            await category.save();

            await inserLog({
                order: 'update',
                table: 'Categoria',
                oldData: oldCategoryName,
                data: category.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Categoria atualizada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete an existing category.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async delete(req, res) {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Categoria não encontrada.' }); };

        try {
            const user = await getUserByToken(req);
            await category.destroy();

            await inserLog({
                order: 'delete',
                table: 'Categoria',
                data: category.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Categoria excluída com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get Category by id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getCategoryById(req, res) {
        const { id } = req.params;

        try {
            const category = await Category.findByPk(id);
            if (!category) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Cateoria não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: category });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all Category in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getAllCategory(req, res) {
        try {
            const categorys = await Category.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            return res.status(HTTP_STATUS.OK).json({ result: categorys });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = CategoryController;