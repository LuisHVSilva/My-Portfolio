// Models
const { models } = require('../db/conn');
const Blog = models.Blog;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');
const inserLog = require('../helpers/insertLog');

// Constants
const { HTTP_STATUS, VALIDATOR_FIELDS, ERROR_MESSAGES, SUCCESS_MESSAGES, LOG_OPTIONS } = require('../constants');

// Local constants.
const MAX_HIGHLIGHTS = 4;
const BLOG = 'Blog';

class BlogController {
    /**
     * Register new user in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { title, subtitle, text, image_one, image_two, image_three, highlight } = req.body;

        // Uses a Validator class to validate that the title, subtitle and text variables are not null.
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).
        const titleError = new Validator(title, VALIDATOR_FIELDS.TITLE).nullField().getError();
        if (titleError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: titleError }); };

        const subtitleError = new Validator(subtitle, VALIDATOR_FIELDS.SUBTITLE).nullField().getError();
        if (subtitleError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: subtitleError }); };

        const textError = new Validator(text, VALIDATOR_FIELDS.TEXT).nullField().getError();
        if (textError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: textError }); };

        try {
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the Blog table where the title column is equal to the value of the title variable.
            // Check if the blogRegistered variables contain any results. If there is a result, it returns an HTTP 404 (NOT_FOUND) response.
            const blogRegistered = await Blog.findOne({ where: { title: title } });
            if (blogRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.REGISTERED_BLOG }); };

            // Uses Sequelize (an ORM for Node.js) to search for all blogs in the Blog table where the highlight column is true..                                    
            const highlightsBlogs = await Blog.findAll({ where: { highlight: true } });

            // Checks whether the number of highlighted blogs (highlightsBlogs) exceeds the MAX_HIGHLIGHTS constant. 
            // It uses Object.keys(highlightsBlogs).length to obtain the number of keys in the highlightsBlogs object, which is equivalent to the number of highlighted blogs.
            if (Object.keys(highlightsBlogs).length > MAX_HIGHLIGHTS) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.HIGHLIGHT_LENGTH + MAX_HIGHLIGHTS });
            };

            // Uses Sequelize (an ORM for Node.js) to create a new entry in the Blog table.
            // It uses the create method to insert a new record, specifying the values ​​for the title, subtitle, text, image_one, image_two, image_three, updatedBy, createdBy and highlight columns.
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

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.CREATE,
                table: BLOG,
                data: blog.title,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the blog was successfully registered, and the blog property containing the details of the newly registered blog.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.REGISTERED_BLOG, blog: blog });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the blog tables (models.Blog) with the primary key (findByPk).
            // Check if the blog and category variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await Blog.findByPk(id);
            if (!blog) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_BLOG }); };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the blog details after updating.
            return res.status(HTTP_STATUS.OK).json({ result: blog });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
            // Uses Sequelize (an ORM for Node.js) to fetch all entries in the Blog table and sort them in ascending order based on the id column.
            const result = await Blog.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the Blog table.
            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { image_one, image_two, image_three } = req.body;

        try {
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the blog tables (models.Blog) with the primary key (findByPk).
            // Check if the blog and category variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await Blog.findByPk(id);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_BLOG }) };

            // Updating the blog properties based on the data provided in the request body (req.body), if any, or maintaining the bank values.
            const oldBlogName = blog.title;
            const title = req.body.title ?? blog.title;
            const subtitle = req.body.subtitle ?? blog.subtitle;
            const text = req.body.title ?? blog.text;
            const highlight = req.body.highlight ?? blog.highlight;

            // Uses Sequelize (an ORM for Node.js) to fetch the entry in the blog table that meets the condition that the text column is equal to the value of the title variable.                        
            const blogRegistered = await Blog.findOne({ where: { title: title } });

            // If blogRegistered is not null, it checks whether the ID of the blog already registered (blogRegistered.id) is different from the ID of the blog being updated (blog.id). 
            // This is done to ensure that the blog with the same title is not considered a duplicate of the actual blog being updated. If the IDs are different, it means they are different blogs with the same title.
            if (blogRegistered) {
                if (blogRegistered.id != blog.id) {
                    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.REGISTERED_BLOG });
                };
            }

            // Uses Sequelize (an ORM for Node.js) to search for all blogs in the Blog table where the highlight column is true..                                    
            const highlightsBlogs = await Blog.findAll({ where: { highlight: true } });

            // Checks whether the number of highlighted blogs (highlightsBlogs) exceeds the MAX_HIGHLIGHTS constant. 
            // It uses Object.keys(highlightsBlogs).length to obtain the number of keys in the highlightsBlogs object, which is equivalent to the number of highlighted blogs.
            if (Object.keys(highlightsBlogs).length > MAX_HIGHLIGHTS) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.HIGHLIGHT_LENGTH + MAX_HIGHLIGHTS });
            };

            // Updates the properties of a blog object based on the values ​​provided for title, subtitle, text, image_one, image_two, image_three, highlight, and user.id.
            blog.title = title;
            blog.subtitle = subtitle;
            blog.text = text;
            blog.image_one = image_one;
            blog.image_two = image_two;
            blog.image_three = image_three;
            blog.highlight = highlight;
            blog.updatedBy = user.id;

            // Saves changes made to the blog object in the database.
            await blog.save();

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.UPDATE,
                table: BLOG,
                oldData: oldBlogName,
                data: blog.title,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the blog was successfully edited.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.UPDATED_BLOG });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the blog tables (models.Blog) with the primary key (findByPk).
            // Check if the blog and category variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await Blog.findByPk(id);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_BLOG }); };

            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);

            // Uses Sequelize (an ORM for Node.js) to delete the record represented by the blog variable from the Blog table.
            await blog.destroy();

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.DELETE,
                table: BLOG,
                data: blog.title,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the blog was successfully deleted.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.DELETED_BLOG });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = BlogController;