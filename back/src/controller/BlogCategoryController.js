// Models
const { models } = require('../db/conn');
const BlogCategory = models.Blog_Category;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');

// Constantsc
const { HTTP_STATUS } = require('../constants');

class BlogCategoryController {
    /**
     * Register a new BlogCategory in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { blogId, categoryId } = req.body;

        const blogIdValidator = new Validator(blogId, "BLOG ID").nullField().getError();
        if (blogIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogIdValidator }); };

        const categoryIdValidator = new Validator(categoryId, "Category ID").nullField().getError();
        if (categoryIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: categoryIdValidator }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Usuário inválido.' }); };

            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog inválido.' }); };

            const category = await models.Category.findByPk(categoryId);
            if (!category) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Categoria inválida.' }); };

            const blogCategory = await BlogCategory.create({
                blog: blog.id,
                category: category.id,
                updatedBy: user.id,
                createdBy: user.id,
            });

            return res.status(HTTP_STATUS.OK).json({ result: blogCategory });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete a category related to a blog based in category id and category id
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async deleteByCategory(req, res) {
        const { blogId, categoryId } = req.query;        

        const blogIdValidator = new Validator(blogId, "BLOG ID").nullField().getError();
        if (blogIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogIdValidator }); };

        const categoryIdValidator = new Validator(categoryId, "Category ID").nullField().getError();
        if (categoryIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: categoryIdValidator }); };

        try {
            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog inválido.' }); };

            const category = await models.Category.findByPk(categoryId);
            if (!category) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Categoria inválida.' }); };

            const blogCategoryRegistered = await BlogCategory.findOne({ where: { blog: blog.id, category: categoryId } });
            if (!blogCategoryRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Categoria não encontrada para o blog.' }); };

            await blogCategoryRegistered.destroy();

            return res.status(HTTP_STATUS.OK).json({ message: 'Tag deletada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get BlogCategory by blog id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getBlogCategoryByBlog(req, res) {
        const { id } = req.params;

        try {
            const blogCategory = await BlogCategory.findAll({ where: { blog: id } });
            if (!blogCategory) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Relação blog | category não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blogCategory });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get BlogCategory by category id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getBlogCategoryByCategory(req, res) {
        const { id } = req.params;

        try {
            const blogCategory = await BlogCategory.findAll({ where: { category: id } });
            if (!blogCategory) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Relação blog | categoria não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blogCategory });
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
    static async getAllBlogCategory(req, res) {
        try {
            const result = await BlogCategory.findAll({
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

module.exports = BlogCategoryController;