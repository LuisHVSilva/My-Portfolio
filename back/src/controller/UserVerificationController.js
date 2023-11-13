// Models
const { sequelize, models } = require('../db/conn');
const UserVerification = models.User_Verification;
const User = models.User;

// Constants
const { HTTP_STATUS } = require('../constants');

// Local constans
const dateString = new Date().toISOString();
const dateNow = new Date(dateString)

// Helpers
const inserLog = require('../helpers/insertLog');

class UserVerificationController {
    static async activeUser(req, res) {
        const { token } = req.body;
        const { id } = req.params;

        if (token.length !== 5) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Favor preencher todos os campos' }) };

        try {
            const code = await UserVerification.findOne({ where: { userId: id, token: token } });

            if (!code) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Dado inválido.' }); };

            if (dateNow > code.deleteTime) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Código expirado.' }); }

            const user = await User.findByPk(id);
            user.available = true;
            user.save();

            code.destroy();

            return res.status(HTTP_STATUS.OK).json({ result: 'Usuário autenticado.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    static async deleteTokens(req, res) {
        try {
            await UserVerification.destroy({ where: { deleteTime: { [sequelize.gt]: dateNow } } });
            
            await inserLog({
                order: 'delete',
                table: 'User_Verification',
                data: 'Tudo',
                user: 'Admin'
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Tokens deletados com sucesso' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
};

module.exports = UserVerificationController;