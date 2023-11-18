const { models } = require('../db/conn');
const UpdateLog = models.Update_Logs;

// Constants
const { HTTP_STATUS, LOG_OPTIONS } = require('../constants');

const inserLog = async ({ order, table, data, oldData, user }) => {
    try {
        if (order === LOG_OPTIONS.CREATE) {
            await UpdateLog.create({ text: `${table} ${data} criada.`, createdBy: user });
        }
        if (order === LOG_OPTIONS.UPDATE) {
            await UpdateLog.create({ text: `${table} ${oldData} atualizada para ${data}.`, createdBy: user });
        }
        if (order === LOG_OPTIONS.DELETE) {
            await UpdateLog.create({ text: `${table} ${data} deletada.`, createdBy: user });
        }
        if (order === LOG_OPTIONS.AVALILABLE) {
            await UpdateLog.create({ text: `${user} autenticado.`, createdBy: user });
        }
    } catch (err) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Erro ao inserir log.', data: { order, table, data, oldData, user } });
    };
};

module.exports = inserLog;
