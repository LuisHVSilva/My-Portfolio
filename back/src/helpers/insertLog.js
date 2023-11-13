const { models } = require('../db/conn');
const UpdateLog = models.Update_Logs;

const inserLog = async ({ order, table, data, oldData, user }) => {
    try {
        if (order === 'create')
            await UpdateLog.create({ text: `${table} ${data} criada.`, createdBy: user });
        if (order === 'update')
            await UpdateLog.create({ text: `${table} ${oldData} atualizada para ${data}.`, createdBy: user });
        if (order === 'delete')
            await UpdateLog.create({ text: `${table} ${data} deletada.`, createdBy: user });
    } catch (err) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Erro ao inserir log.', data: { order, table, data, oldData, user } });
    };
};

module.exports = inserLog;
