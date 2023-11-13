// Models
const { models } = require('../db/conn');
const BlogTag = models.Blog_Tag;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');

// Constants
const { HTTP_STATUS } = require('../constants');

class BlogTagController {
    /**
     * Register a new Blog_Tag.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { blogId, tagId } = req.body;

        const blogValidator = new Validator(blogId, "BLOG ID").nullField().getError();
        if (blogValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogValidator }); };

        const tagIdValidator = new Validator(tagId, "TAG ID").nullField().getError();
        if (tagIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: tagIdValidator }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Usuário inválido.' }); };

            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog inválido.' }); };

            const tag = await models.Tag.findByPk(tagId);
            if (!tag) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Tag inválida.' }); };

            const blogTagRegistered = await BlogTag.findOne({ where: { blog: blog.id, tag: tagId } });
            if (blogTagRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Tag já registrada para o blog.' }); };

            const blogTag = await BlogTag.create({
                blog: blog.id,
                tag: tag.id,
                updatedBy: user.id,
                createdBy: user.id,
            });

            return res.status(HTTP_STATUS.OK).json({ result: blogTag });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete a tag related to a blog based in tag id and blog id
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async deleteByTag(req, res) {
        const { blogId, tagId } = req.query;        
                
        const blogValidator = new Validator(blogId, "BLOG ID").nullField().getError();
        if (blogValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogValidator }); };

        const tagIdValidator = new Validator(tagId, "TAG ID").nullField().getError();
        if (tagIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: tagIdValidator }); };

        try {
            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog inválido.' }); };

            const tag = await models.Tag.findByPk(tagId);
            if (!tag) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Tag inválida.' }); };

            const blogTagRegistered = await BlogTag.findOne({ where: { blog: blog.id, tag: tagId } });
            if (!blogTagRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Tag não encontrada para o blog.' }); };

            await blogTagRegistered.destroy();

            return res.status(HTTP_STATUS.OK).json({ message: 'Tag deletada com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get BlogTag by blog id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getBlogTagByBlog(req, res) {
        const { id } = req.params;

        try {
            const blogTag = await BlogTag.findAll({ where: { blog: id } });
            if (!blogTag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Relação blog | tag não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blogTag });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get BlogTag by tag id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getBlogTagByTag(req, res) {
        const { id } = req.params;

        try {
            const blogTag = await BlogTag.findAll({ where: { tag: id } });
            if (!blogTag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Relação blog | tag não encontrada.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blogTag });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all BlogTag in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getAllBlogTag(req, res) {
        try {
            const result = await BlogTag.findAll({
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

module.exports = BlogTagController;