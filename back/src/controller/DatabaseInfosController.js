// Database configuration
const { sequelize, models } = require('../db/conn');

// Constants
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

// Models
const UpdateLog = models.Update_Logs;

class DatabaseInfosController {
    /**
     * Get all tables in the schema.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getTables(req, res) {
        try {
            // Uses the sequelize.query method to perform a direct SQL query on the database. 
            // The query searches for table names in the public schema database (table_schema = 'public') that are of type BASE TABLE. 
            // The ORDER BY table_name clause sorts results by table name.
            const result = await sequelize.query(
                `SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
                ORDER BY table_name;`
            );

            // Manipulates the result of the SQL query to extract the table names.
            const tableNames = result[0].map(row => row.table_name);

            // Returns an HTTP 200 (OK) response with a JSON object containing the tableNames object in result.
            return res.status(HTTP_STATUS.OK).json({ result: tableNames });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all columns in a table of the schema.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getColumns(req, res) {
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { table_name } = req.params;

        try {
            // Uses the table name (table_name) obtained previously to access the corresponding model in the models property.
            const model = models[table_name];

            // If model is null or undefined, it means that the model corresponding to the table was not found in the models object.
            if (!model) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_TABLE }); };

            // This code snippet uses the Sequelize model's describe() function to obtain information about the columns of the table represented by the model.
            const columns = await model.describe();

            // Extract the column names from the columns object and store them in an array called columnNames.
            const columnNames = Object.keys(columns);

            // Returns an HTTP 200 (OK) response with a JSON object containing the columnNames object in result.
            return res.status(HTTP_STATUS.OK).json({ result: columnNames });
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
    static async getLogs(req, res) {
        try {
            // Uses Sequelize (an ORM for Node.js) to fetch all entries in the UpdateLog table and sort them in ascending order based on the id column.
            const result = await UpdateLog.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the Log object in result.
            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = DatabaseInfosController;