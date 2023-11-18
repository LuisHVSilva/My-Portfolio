// Models
const { models } = require('../db/conn');
const BlogCategory = models.Blog_Category;
const Blog = models.Blog;
const Category = models.Category;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');

// Constants
const { HTTP_STATUS, VALIDATOR_FIELDS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../constants');

class BlogCategoryController {
    /**
     * Register a new BlogCategory in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { blogId, categoryId } = req.body;

        // Uses a Validator class to validate that the blogId and categoryId variables are not null. 
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).
        const blogIdValidator = new Validator(blogId, VALIDATOR_FIELDS.BLOG_ID).nullField().getError();
        if (blogIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogIdValidator }) };

        const categoryIdValidator = new Validator(categoryId, VALIDATOR_FIELDS.CATEGORY_ID).nullField().getError();
        if (categoryIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: categoryIdValidator }) };

        try {
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.INVALID_USER }) };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the blogs and category tables (models.Blog | models.Category) with the primary key (findByPk).
            // Check if the blog and category variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_BLOG }) };

            const category = await Category.findByPk(categoryId);
            if (!category) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_CATEGORY }) };

            // Uses Sequelize (an ORM for Node.js) to fetch a record from the BlogCategory table where the blog and category columns are equal to the blog.id and categoryId values.
            // Check if the blogCategoryRegistered variables contain any results. If there is a result, it returns an HTTP 409 (CONFLICT) response.
            const blogCategoryRegistered = await BlogCategory.findOne({ where: { blog: blog.id, category: categoryId } });
            if (blogCategoryRegistered) { return res.status(HTTP_STATUS.CONFLICT).json({ error: ERROR_MESSAGES.REGISTERED_BLOG_CATEGORY }) };

            // Uses Sequelize (an ORM for Node.js) to create a new entry in the BlogCategory table.
            // It uses the create method to insert a new record, specifying the values ​​for the blog, category, updatedBy and createdBy columns.
            await BlogCategory.create({
                blog: blog.id,
                category: category.id,
                updatedBy: user.id,
                createdBy: user.id,
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property, indicating that the category was successfully registered.
            return res.status(HTTP_STATUS.OK).json({ message:  SUCCESS_MESSAGES.REGISTERED_BLOG_CATEGORY});
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to fetch the entry in the BlogCategory table that meets the condition that the blog column is equal to the value of the id variable.
            // Check if the blogCategory variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blogCategory = await BlogCategory.findAll({ where: { blog: id } });
            if (!blogCategory) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error:  ERROR_MESSAGES.NOT_FOUND_BLOG_CATEGORY}); };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the BlogCategory table.
            return res.status(HTTP_STATUS.OK).json({ result: blogCategory });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for all entries in the BlogCategory table where the category column is equal to the value of the id variable.
            // Check if the blogCategory variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blogCategory = await BlogCategory.findAll({ where: { category: id } });
            if (!blogCategory) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.NOT_FOUND_BLOG_CATEGORY }); };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the BlogCategory table.
            return res.status(HTTP_STATUS.OK).json({ result: blogCategory });
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
    static async getAllBlogCategory(req, res) {
        try {
            // Uses Sequelize (an ORM for Node.js) to fetch all entries in the BlogCategory table and sort them in ascending order based on the id column.
            const result = await BlogCategory.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the BlogCategory table.
            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete a category related to a blog based in category id and category id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async deleteByCategory(req, res) {
        // Destructuring assignment to extract properties from the req.body object and assign them to separate variables.
        const { blogId, categoryId } = req.query;

        // Uses a Validator class to validate that the blogId and categoryId variables are not null.
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).        
        const blogIdValidator = new Validator(blogId, VALIDATOR_FIELDS.BLOG_ID).nullField().getError();
        if (blogIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: blogIdValidator }); };

        const categoryIdValidator = new Validator(categoryId, VALIDATOR_FIELDS.CATEGORY_ID).nullField().getError();
        if (categoryIdValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: categoryIdValidator }); };

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the blog and category tables (models.Blog | models.Category) with the primary key (findByPk).
            // Check if the blog and category variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const blog = await Blog.findByPk(blogId);
            if (!blog) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_BLOG }); };

            const category = await Category.findByPk(categoryId);
            if (!category) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_CATEGORY }); };

            // Uses Sequelize (an ORM for Node.js) to look for a record in the BlogCategory table where the blog and category columns correspond to the blog.id and categoryId values, respectively.
            const blogCategoryRegistered = await BlogCategory.findOne({ where: { blog: blog.id, category: categoryId } });

            // If no records are found (!blogCategoryRegistered), the code returns an HTTP 422 (UNPROCESSABLE_ENTITY) response with an error message indicating that the category was not found for the blog.
            if (!blogCategoryRegistered) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.NOT_FOUND_BLOG_CATEGORY }); };

            // Uses Sequelize (an ORM for Node.js) to delete the record represented by the blogCategoryRegistered variable from the BlogCategory table.
            await blogCategoryRegistered.destroy();

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property, indicating that the category was successfully deleted.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.DELETED_BLOG_CATEGORY});
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = BlogCategoryController;