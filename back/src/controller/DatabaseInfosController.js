// Database configuration
const { sequelize, models } = require('../db/conn');

// Constants
const { HTTP_STATUS } = require('../constants');

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
            const result = await sequelize.query(
                `SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
                ORDER BY table_name;`
            );

            const tableNames = result[0].map(row => row.table_name);

            return res.status(HTTP_STATUS.OK).json({ result: tableNames });
        } catch (error) {
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
        const { table_name } = req.params;

        try {
            const model = models[table_name];

            if (!model) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Tabela não encontrada' }); };

            const columns = await model.describe();
            const columnNames = Object.keys(columns);

            return res.status(HTTP_STATUS.OK).json({ result: columnNames });
        } catch (error) {
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
            const result = await UpdateLog.findAll({
                order: [
                    ['createdAt', 'DESC'] 
                ]
            });

            return res.status(HTTP_STATUS.OK).json({ result: result });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = DatabaseInfosController;