// Models
const { models } = require('../db/conn');
const Blog = models.Blog;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');
const countHighlights = require('../helpers/countHighlights');
const inserLog = require('../helpers/insertLog');

// Constants
const { HTTP_STATUS } = require('../constants');

const maxHighligts = 4;

class BlogController {
    /**
     * Register new user in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { title, subtitle, text, image_one, image_two, image_three, highlight } = req.body;

        const titleError = new Validator(title, 'TÍTULO').nullField().getError();
        if (titleError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: titleError }); };

        const subtitleError = new Validator(subtitle, 'SUBTÍTULO').nullField().getError();
        if (subtitleError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: subtitleError }); };

        const textError = new Validator(text, 'TEXTO').nullField().getError();
        if (textError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: textError }); };

        try {
            const user = await getUserByToken(req);
            if (!user) { return res.status(UNAUTHORIZED).json({ message: 'Usuário inválido.' }); };

            const blogRegistered = await Blog.findOne({ where: { title: title } });
            if (blogRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog já cadastrado.' }); };

            const allBlogs = await Blog.findAll();
            const blogHighlights = countHighlights(allBlogs);
            if (blogHighlights > maxHighligts) { { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: `A quantidade de blogs em destaque já possui o máximo possível: ${maxHighligts}` }); }; };

            const blog = await Blog.create({
                title: title,
                subtitle: subtitle,
                text: text,
                image_one: image_one,
                image_two: image_two,
                image_three: image_three,
                updatedBy: user.id,
                createdBy: user.id,
                highlight: highlight
            });

            await inserLog({
                order: 'create',
                table: 'Blog',
                data: blog.title,
                user: user.name
            })


            return res.status(HTTP_STATUS.OK).json({ message: 'Blog cadastrado com sucesso.', blog: blog });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Update an existing blog.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async edit(req, res) {
        const { id } = req.params;

        const { image_one, image_two, image_three } = req.body;

        try {
            const user = await getUserByToken(req);

            const blog = await Blog.findByPk(id);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog não encontrado.' }) };
            const oldBlogName = blog.title;

            const title = req.body.title ?? blog.title;
            const subtitle = req.body.subtitle ?? blog.subtitle;
            const text = req.body.title ?? blog.text;
            const highlight = req.body.highlight ?? blog.highlight;

            const blogRegistered = await Blog.findOne({ where: { title: title } });
            if (blogRegistered) {
                if (blogRegistered.id != blog.id) {
                    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog já cadastrado.' });
                };
            }

            const allBlogs = await Blog.findAll();
            const blogHighlights = countHighlights(allBlogs);
            if (blogHighlights > maxHighligts) { { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: `A quantidade de blogs em destaque já possui o máximo possível: ${maxHighligts}` }); }; };

            blog.title = title;
            blog.subtitle = subtitle;
            blog.text = text;
            blog.image_one = image_one;
            blog.image_two = image_two;
            blog.image_three = image_three;
            blog.highlight = highlight;
            blog.updatedBy = user.id;

            await blog.save();

            await inserLog({
                order: 'update',
                table: 'Blog',
                oldData: oldBlogName,
                data: blog.title,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Blog atualizado com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete an existing blog.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async delete(req, res) {
        const { id } = req.params;

        const blog = await Blog.findByPk(id);
        if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Blog não encontrado.' }); };

        try {
            const user = await getUserByToken(req);
            await blog.destroy();

            await inserLog({
                order: 'delete',
                table: 'Blog',                
                data: blog.title,
                user: user.name
            })


            return res.status(HTTP_STATUS.OK).json({ message: 'Blog excluído com sucesso.' });
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
    static async getBlogById(req, res) {
        const { id } = req.params;

        try {
            const blog = await Blog.findByPk(id);
            if (!blog) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Blog não encontrado.' }); };

            return res.status(HTTP_STATUS.OK).json({ result: blog });
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
    static async getAllBlog(req, res) {
        try {
            const result = await Blog.findAll({
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

module.exports = BlogController;