// Models
const { models } = require('../db/conn');
const BlogCategorie = models.Blog_Categorie;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');

// Constantsc
const { HTTP_STATUS } = require('../constants');

class BlogCategorieController {
    /**
     * Register a new BlogCategorie in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { blogId, categorieId } = req.body;

        const blogIdValidator = new Validator(blogId, "BLOG ID").nullField().getError();
        if (blogIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogIdValidator }); };

        const categorieIdValidator = new Validator(categorieId, "Categorie ID").nullField().getError();
        if (categorieIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: categorieIdValidator }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Usuário inválido.' }); };

            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog inválido.' }); };

            const categorie = await models.Categorie.findByPk(categorieId);
            if (!categorie) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Categoria inválida.' }); };

            const blogCategorie = await BlogCategorie.create({
                blog: blog.id,
                categorie: categorie.id,
                updatedBy: user.id,
                createdBy: user.id,
            });

            return res.status(HTTP_STATUS.OK).json({ result: blogCategorie });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete a categorie related to a blog based in categorie id and categorie id
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async deleteByCategorie(req, res) {
        const { blogId, categorieId } = req.query;        

        const blogIdValidator = new Validator(blogId, "BLOG ID").nullField().getError();
        if (blogIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogIdValidator }); };

        const categorieIdValidator = new Validator(categorieId, "Categorie ID").nullField().getError();
        if (categorieIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: categorieIdValidator }); };

        try {
            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog inválido.' }); };

            const categorie = await models.Categorie.findByPk(categorieId);
            if (!categorie) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Categoria inválida.' }); };

            const blogCategorieRegistered = await BlogCategorie.findOne({ where: { blog: blog.id, categorie: categorieId } });
            if (!blogCategorieRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Categoria não encontrada para o blog.' }); };

            await blogCategorieRegistered.destroy();

            return res.status(HTTP_STATUS.OK).json({ message: 'Tag deletada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get BlogCategorie by blog id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getBlogCategorieByBlog(req, res) {
        const { id } = req.params;

        try {
            const blogCategorie = await BlogCategorie.findAll({ where: { blog: id } });
            if (!blogCategorie) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Relação blog | categorie não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blogCategorie });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get BlogCategorie by categorie id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getBlogCategorieByCategorie(req, res) {
        const { id } = req.params;

        try {
            const blogCategorie = await BlogCategorie.findAll({ where: { categorie: id } });
            if (!blogCategorie) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Relação blog | categoria não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blogCategorie });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all blogs in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getAllBlogCategorie(req, res) {
        try {
            const result = await BlogCategorie.findAll({
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

module.exports = BlogCategorieController;