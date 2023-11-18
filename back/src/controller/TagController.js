// Models
const { models } = require('../db/conn');
const Tag = models.Tag;

// Helpers
const Validator = require('../helpers/Validator');
const getUserByToken = require('../helpers/getUserByToken');
const inserLog = require('../helpers/insertLog');

// Constants
const { HTTP_STATUS, VALIDATOR_FIELDS, ERROR_MESSAGES, SUCCESS_MESSAGES, LOG_OPTIONS } = require('../constants');

// Local constants
const TAG = 'Tag';

class TagController {
    /**
     * Register new tag in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { name } = req.body;

        // Uses a Validator class to validate that the name variable are not null.
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).
        const fieldError = new Validator(name, VALIDATOR_FIELDS.NAME).nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        try {
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the Tag table where the name column is equal to the value of the name variable.
            // Check if the tagsExists variables contain any results. If there is a result, it returns an HTTP 404 (NOT_FOUND) response.
            const tagsExists = await Tag.findOne({ where: { name: name.toUpperCase() } });
            if (tagsExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: ERROR_MESSAGES.REGISTERED_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to create a new entry in the Tab table.
            // It uses the create method to insert a new record, specifying the values ​​for the name, createdBy and updatedBy columns.
            const tag = await Tag.create({
                name: name.toUpperCase(),
                createdBy: user.id,
                updatedBy: user.id
            });

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.CREATE,
                table: TAG,
                data: tag.name,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the tag was successfully registered.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.REGISTERED_TAG });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the Tag table (models.Tag) with the primary key (findByPk).
            // Check if the tag contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const tag = await Tag.findByPk(id);
            if (!tag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_TAG }); };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the Tag details after updating.
            return res.status(HTTP_STATUS.OK).json({ result: tag });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
            // Uses Sequelize (an ORM for Node.js) to fetch all entries in the Tag table and sort them in ascending order based on the id column.
            const result = await Tag.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the result of the query to the Tag table.
            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { name } = req.body;

        // Uses a Validator class to validate that the name variable is not null.
        // If there is a validation error, returns a JSON object with an error message and HTTP status 422 (UNPROCESSABLE_ENTITY).
        const fieldError = new Validator(name, VALIDATOR_FIELDS.NAME).nullField().getError();
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        try {
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the Tag table (models.Tag) with the primary key (findByPk).
            // Check if the variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const tag = await Tag.findByPk(id);
            if (!tag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the Tag table where the name column is equal to the value of the name variable.
            // Check if the tagsExists variables contain any results. If there is a result, it returns an HTTP 404 (NOT_FOUND) response.
            const tagsExists = await Tag.findOne({ where: { name: name } });
            if (tagsExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: ERROR_MESSAGES.REGISTERED_TAG }); };

            // Create a variable that contains the tag name before the table be updated.
            const oldTagName = tag.name;

            // Updating the tag properties based on the data provided in the request body (req.body).
            tag.name = name.toUpperCase();
            tag.updatedBy = user.id;

            // Saves changes made to the tag object in the database.
            await tag.save();

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.UPDATE,
                table: TAG,
                oldData: oldTagName,
                data: tag.name,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the tag was successfully edited.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.UPDATED_TAG});
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {            
            // Uses the getUserByToken function to obtain an asynchronous user based on the token present in the req object (request).
            // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await getUserByToken(req);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the Tag table (models.Tag) with the primary key (findByPk).
            // Check if the variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const tag = await Tag.findByPk(id);
            if (!tag) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_TAG }); };

            // Uses Sequelize (an ORM for Node.js) to delete the record represented by the tag variable from the Tag table.
            await tag.destroy();

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.DELETE,
                table: TAG,
                data: tag.name,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the tag was successfully deleted.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.DELETED_TAG});
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = TagController;