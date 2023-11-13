// Core Modules
const bcrypt = require('bcrypt');

// Models
const { models } = require('../db/conn');
const User = models.User;
const UserVerification = models.User_Verification;

// Helpers
const Validator = require('../helpers/Validator');
const createUserToken = require('../helpers/createUserToken');
const getUserByToken = require('../helpers/getUserByToken');
const inserLog = require('../helpers/insertLog');
const userVerifyToken = require('../helpers/userVerifyToken')

// Services
const sendEmailConfirmation = require('../services/sendEmailConfirmation');

// Constants
const { HTTP_STATUS } = require('../constants');

const errorMessages = {
    name: "NOME",
    email: "EMAIL",
    confirmEmail: "EMAIL DE CONFIRMAÇÃO",
    password: "SENHA",
    confirmPassword: "SENHA DE CONFIRMAÇÃO",
    notFound: "Usuário não encontrado",
    incorrectPassword: "Senha incorreta",
    emailExists: "Email já cadastrado no banco de dados",
    emailExistsEdit: "Email já cadastrado",
};

/**
 * Validate the fields before creating a new user in the database.
 * @param {Request} req - HTTP Request object.
 * @param {Response} res - HTTP Response object.
 * @param {Array} fields - Arrray that contains objects that describe the fields to be validated.
 * @returns {string|null} - Return a String with errors if exists or null if there is no error.
 */
const validateFields = (req, res, fields) => {
    for (const field of fields) {
        const value = req.body[field.name];
        const error = field.validator(value, req.body);

        if (error) { return error; };
    };
};

class UserController {
    /**
     * Register new user in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async register(req, res) {
        const { name, email, password } = req.body;

        const fields = [
            { name: 'name', validator: (val) => new Validator(val, errorMessages.name).nullField().fieldLength(4, 50).noNumberCharacters().noSpecialCharacters().getError() },
            { name: 'email', validator: (val) => new Validator(val, errorMessages.email).nullField().emailPattern().getError() },
            { name: 'confirmEmail', validator: (val, body) => new Validator(val, errorMessages.confirmEmail).nullField().confirmField(body.email).getError() },
            { name: 'password', validator: (val) => new Validator(val, errorMessages.password).nullField().fieldLength(6, 50).presentSpecialCharacters().presentNumberCharacters().getError() },
            { name: 'confirmPassword', validator: (val, body) => new Validator(val, errorMessages.confirmPassword).nullField().confirmField(body.password).getError() }
        ];
        try {
            const fieldError = validateFields(req, res, fields);
            if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

            const userExists = await User.findOne({ where: { email: email } });
            if (userExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Email já cadastrado.' }); };

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await User.create({ name, email, password: passwordHash });

            const token = await UserVerification.create({ userId: user.id, token: userVerifyToken() })
            sendEmailConfirmation(user.email, token.token);
            
            await inserLog({
                order: 'create',
                table: 'Usuário',
                data: user.name,
                user: user.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Usuário registrado.', result: user });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Authenticate a user.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const emailValidator = new Validator(email, errorMessages.email).nullField().getError();
            if (emailValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: emailValidator }); };

            const passwordValidator = new Validator(password, errorMessages.password).nullField().getError();
            if (passwordValidator) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: passwordValidator }); };

            const user = await User.findOne({ where: { email: email } });
            if (!user) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Usuário inválido.' }); };

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: 'Credenciais inválidas.' }); };

            if (!user.available) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Usuário desativado' }) }

            const token = createUserToken(user, '12h');

            // res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000), sameSite: 'Lax' });
            res.cookie('token', token);

            return res.status(HTTP_STATUS.OK).json({ message: 'Login bem-sucedido.' });;
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * User logout
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}     
     */
    static async logout(req, res) {
        try {
            res.clearCookie('token');

            return res.status(HTTP_STATUS.OK).json({ message: 'Logout bem-sucedido.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }


    /**
     * Update an existing user.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async edit(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Usuário inválido.' }); };

        const { name, email, password } = req.body;

        const fields = [
            { name: 'name', validator: (val) => new Validator(val, errorMessages.name).nullField().fieldLength(4, 50).noNumberCharacters().noSpecialCharacters().getError() },
            { name: 'email', validator: (val) => new Validator(val, errorMessages.email).nullField().emailPattern().getError() },
            { name: 'confirmEmail', validator: (val, body) => new Validator(val, errorMessages.confirmEmail).nullField().confirmField(body.email).getError() },
            { name: 'password', validator: (val) => new Validator(val, errorMessages.password).nullField().fieldLength(6, 50).presentSpecialCharacters().presentNumberCharacters().getError() },
            { name: 'confirmPassword', validator: (val, body) => new Validator(val, errorMessages.confirmPassword).nullField().confirmField(body.password).getError() }
        ];

        const fieldError = await validateFields(req, res, fields);
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        const userExists = await User.findOne({ where: { email: email } });
        if (userExists && userExists.id != id) { return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Email já cadastrado no banco de dados.' }); };

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            const oldUserName = user.name;
            const updatedBy = await getUserByToken(req);

            user.name = name;
            user.email = email;
            user.password = passwordHash;
            user.updatedBy = updatedBy;

            user.save();

            await inserLog({
                order: 'update',
                table: 'Usuário',
                oldData: oldUserName,
                data: user.name,
                user: updatedBy.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Usuário atualizado com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Delete an existing user.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async delete(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Usuário não encontrado.' }); };

        try {
            const updatedBy = await getUserByToken(req);

            await user.destroy();
            res.cookie('token', '', { maxAge: 1 });

            await inserLog({
                order: 'delete',
                table: 'Usuário',
                data: user.name,
                user: updatedBy.name
            })

            return res.status(HTTP_STATUS.OK).json({ message: 'Usuário excluído com sucesso.' });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get user by id.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Usuário não encontrado.' }); };

            const userWithoutPassword = { ...user.get(), password: undefined };

            return res.status(HTTP_STATUS.OK).json({ result: userWithoutPassword });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    /**
     * Get all users in database.
     * @param {Request} req - HTTP Request object.
     * @param {Response} res - HTTP Response object.
     * @returns {void}
     */
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            const usersWithoutPassword = users.map(user => {
                const { password, ...userWithoutPassword } = user.get();
                return userWithoutPassword;
            });

            return res.status(HTTP_STATUS.OK).json({ result: usersWithoutPassword });
        } catch (error) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = UserController;