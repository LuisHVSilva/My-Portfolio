// Models
const { models } = require('../db/conn');
const BlogTag = models.Blog_Tag;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');

// Constants
const { HTTP_STATUS, VALIDATOR_FIELDS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../constants');

class BlogTagController {
    /**
     * Register a new Blog_Tag.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { blogId, tagId } = req.body;

        // Uses a Validator class to validate that the blogId and tagId variables are not null. 
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).
        const blogValidator = new Validator(blogId, VALIDATOR_FIELDS.BLOG_ID).nullField().getError();
        if (blogValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogValidator }); };

        const tagIdValidator = new Validator(tagId, VALIDATOR_FIELDS.TAG_ID).nullField().getError();
        if (tagIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: tagIdValidator }); };

        try {
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the blogs and tag tables (models.Blog | models.tag) with the primary key (findByPk).
            // Check if the blog and tag variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_BLOG }); };

            const tag = await models.Tag.findByPk(tagId);
            if (!tag) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to fetch a record from the BlogTag table where the blog and tag columns are equal to the blog.id and tagId values.
            // Check if the blogTagRegistered variables contain any results. If there is a result, it returns an HTTP 409 (CONFLICT) response.
            const blogTagRegistered = await BlogTag.findOne({ where: { blog: blog.id, tag: tagId } });
            if (blogTagRegistered) { return res.status(HTTP_STATUS.CONFLICT).json({ error: ERROR_MESSAGES.REGISTERED_BLOG_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to create a new entry in the BlogTag table.
            // It uses the create method to insert a new record, specifying the values ​​for the blog, tag, updatedBy and createdBy columns.
            await BlogTag.create({
                blog: blog.id,
                tag: tag.id,
                updatedBy: user.id,
                createdBy: user.id,
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property, indicating that the tag was successfully registered.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.REGISTERED_BLOG_TAG });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to fetch the entry in the BlogTag table that meets the condition that the blog column is equal to the value of the id variable.
            // Check if the blogTag variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blogTag = await BlogTag.findAll({ where: { blog: id } });
            if (!blogTag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.NOT_FOUND_BLOG_TAG }); };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the BlogTag table.
            return res.status(HTTP_STATUS.OK).json({ result: blogTag });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for all entries in the BlogTag table where the category column is equal to the value of the id variable.
            // Check if the BlogTag variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blogTag = await BlogTag.findAll({ where: { tag: id } });
            if (!blogTag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.NOT_FOUND_BLOG_TAG }) };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the BlogTag table.
            return res.status(HTTP_STATUS.OK).json({ result: blogTag });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
            // Uses Sequelize (an ORM for Node.js) to fetch all entries in the BlogTag table and sort them in ascending order based on the id column.
            const result = await BlogTag.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the BlogTag table.
            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract properties from the req.body object and assign them to separate variables.
        const { blogId, tagId } = req.query;

        // Uses a Validator class to validate that the blogId and tagId variables are not null. 
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).
        const blogValidator = new Validator(blogId, VALIDATOR_FIELDS.BLOG_ID).nullField().getError();
        if (blogValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogValidator }); };

        const tagIdValidator = new Validator(tagId, VALIDATOR_FIELDS.TAG_ID).nullField().getError();
        if (tagIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: tagIdValidator }); };

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the blogs and tag tables (models.Blog | models.tag) with the primary key (findByPk).
            // Check if the blog and tag variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await models.Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_BLOG }); };

            const tag = await models.Tag.findByPk(tagId);
            if (!tag) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to fetch a record from the BlogTag table where the blog and tag columns are equal to the blog.id and tagId values.
            // Check if the blogTagRegistered variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blogTagRegistered = await BlogTag.findOne({ where: { blog: blog.id, tag: tagId } });
            if (!blogTagRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.REGISTERED_BLOG_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to delete the record represented by the blogTagRegistered variable from the BlogTag table.
            await blogTagRegistered.destroy();

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property, indicating that the tag was successfully deleted.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.DELETED_BLOG_TAG });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

};

module.exports = BlogTagController;