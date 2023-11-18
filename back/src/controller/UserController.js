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
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, LOG_OPTIONS } = require('../constants');

// Local constants
const TOKEN_EXPIRED = '12h';
const USER = 'Usuário';
const TOKEN = 'token';

/**
 * Validate the fields before creating a new user in the database.
 * @param {Array} fields - Array that contains objects that describe the fields to be validated (name, validate function and value).
 * @returns {string|null} - Return a String with errors if exists or null if there is no error.
 */
const validateFields = (fields) => {
    for (const field of fields) {
        const error = field.validator(field.value);
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
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { name, email, confirmEmail, password, confirmPassword } = req.body;

        // Defines an array called fields, where each element is an object containing information about a specific field being validated. Each object has the following properties:        
        // 1. value: The value of the field.
        // 2. validator: A function that receives the value of the field (val) and returns an error message if validation fails or null if validation succeeds.
        const fields = [
            { validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_NAME).nullField().fieldLength(4, 50).noNumberCharacters().noSpecialCharacters().getError() },
            { value: email, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_EMAIL).nullField().emailPattern().getError() },
            { value: confirmEmail, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_CONFIRM_EMAIL).nullField().confirmField(email).getError() },
            { value: password, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_PASSWORD).nullField().fieldLength(6, 50).presentSpecialCharacters().presentNumberCharacters().getError() },
            { value: confirmPassword, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_CONFIRM_PASSWORD).nullField().confirmField(password).getError() }
        ];

        // Performs validation of the request fields based on the rules defined in the fields array.
        // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
        const fieldError = validateFields(fields);
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table where the email column is equal to the value of the email variable.
            // Check if the userExists variables contain any results. If there is a result, it returns an HTTP 404 (NOT_FOUND) response.
            const userExists = await User.findOne({ where: { email: email } });
            if (userExists) { return res.status(HTTP_STATUS.CONFLICT).json({ error: ERROR_MESSAGES.REGISTERED_EMAIL }); };

            // uses the bcrypt library to generate a "salt" (random sequence) that will be used during the password hashing process. 
            // Salt is a random addition to the data before applying the hash function, and this helps to increase the security of passwords.
            const salt = await bcrypt.genSalt(12);

            // Uses the bcrypt.hash function to generate the secure hash of the provided password, using the previously generated salt.
            const passwordHash = await bcrypt.hash(password, salt);

            // Uses Sequelize (an ORM for Node.js) to create a new entry in the User table.
            // It uses the create method to insert a new record, specifying the values ​​for the name, email and password columns.
            const user = await User.create({
                name: name,
                email: email,
                password: passwordHash
            });

            // Creates a record in the UserVerification table using Sequelize.
            const cookieToken = await UserVerification.create({ userId: user.id, token: userVerifyToken() })

            // Sends an email when calling the sendEmailConfirmation function, passing the user's email (user.email) and the generated token (token.token).
            sendEmailConfirmation(user.email, cookieToken.token);

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.CREATE,
                table: USER,
                data: user.name,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the user was successfully registered.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.REGISTERED_USER });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { email, password } = req.body;

        // Defines an array called fields, where each element is an object containing information about a specific field being validated. Each object has the following properties:
        // 1. name: The name of the field.
        // 2. value: The value of the field.
        // 3. validator: A function that receives the value of the field (val) and returns an error message if validation fails or null if validation succeeds.
        const fields = [
            { value: email, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_EMAIL).nullField().getError() },
            { value: password, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_PASSWORD).nullField().getError() },
        ];

        // Performs validation of the request fields based on the rules defined in the fields array.
        // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
        const fieldError = validateFields(fields);
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table where the email column is equal to the value of the email variable.
            // Check if the user variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await User.findOne({ where: { email: email } });
            if (!user) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_USER }); };

            // Uses the bcrypt.compare function to check whether the provided password (password) matches the password stored in the database for the user (user.password).
            // Check if the checkPassword variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS }); };

            // Check if user is avalilabe contain any results. If no, it returns an HTTP 401 (UNAUTHORIZED) response.
            if (!user.available) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.DISABLE_USER }) }

            // Generate an authentication token for the user.
            const cookieToken = createUserToken(user, TOKEN_EXPIRED);

            // Sets a cookie called TOKEN in the HTTP response.
            // res.cookie(TOKEN, token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000), sameSite: 'Lax' });
            res.cookie(TOKEN, cookieToken);

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the user was successfully logged.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.LOGIN });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
            // Clears (removes) the cookie called TOKEN from the HTTP response.
            res.clearCookie(TOKEN);

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the user was successfully logged out.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.LOGOUT });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { name, email, password } = req.body;

        // Defines an array called fields, where each element is an object containing information about a specific field being validated. Each object has the following properties:
        // 1. name: The name of the field.
        // 2. value: The value of the field.
        // 3. validator: A function that receives the value of the field (val) and returns an error message if validation fails or null if validation succeeds.
        const fields = [
            { validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_NAME).nullField().fieldLength(4, 50).noNumberCharacters().noSpecialCharacters().getError() },
            { value: email, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_EMAIL).nullField().emailPattern().getError() },
            { value: confirmEmail, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_CONFIRM_EMAIL).nullField().confirmField(email).getError() },
            { value: password, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_PASSWORD).nullField().fieldLength(6, 50).presentSpecialCharacters().presentNumberCharacters().getError() },
            { value: confirmPassword, validator: (val) => new Validator(val, ERROR_MESSAGES.INVALID_CONFIRM_PASSWORD).nullField().confirmField(password).getError() }
        ];


        // Performs validation of the request fields based on the rules defined in the fields array.
        // Check if the user variable contains any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
        const fieldError = validateFields(fields);
        if (fieldError) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: fieldError }); };

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table with id.
            // Check if the user variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await User.findByPk(id);
            if (!user) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_USER }); };

            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table where the email column is equal to the value of the email variable.
            // Checks if a user already exists in the database with the same email (userExists), and if this user's ID is different from the provided ID (id). If both criteria are met, it means that there is already a different user in the database with the same email, and the code returns an HTTP 409 (CONFLICT) response with a JSON object containing an error message indicating that the email mail is already registered in the database.
            const userExists = await User.findOne({ where: { email: email } });
            if (userExists && userExists.id != id) { return res.status(HTTP_STATUS.CONFLICT).json({ error: ERROR_MESSAGES.REGISTERED_EMAIL }); };

            // uses the bcrypt library to generate a "salt" (random sequence) that will be used during the password hashing process. 
            // Salt is a random addition to the data before applying the hash function, and this helps to increase the security of passwords.
            const salt = await bcrypt.genSalt(12);

            // Uses the bcrypt.hash function to generate the secure hash of the provided password, using the previously generated salt.
            const passwordHash = await bcrypt.hash(password, salt);

            // Create a variable that contains the user name before the table be updated.
            const oldUserName = user.name;

            // Uses the getUserByToken function to obtain information about the user making the request, based on the token included in the request (req).
            const updatedBy = await getUserByToken(req);

            // Updating the user properties based on the data provided in the request body (req.body).
            user.name = name;
            user.email = email;
            user.password = passwordHash;
            user.updatedBy = updatedBy;

            // Saves changes made to the user object in the database.
            user.save();

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.DELETE,
                table: USER,
                oldData: oldUserName,
                data: user.name,
                user: updatedBy.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the user was successfully edited.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.UPDATED_BLOG });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table with id.
            // Check if the user variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await User.findByPk(id);
            if (!user) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_USER }); };

            // Create a version of the user object without including the user's password.
            const userWithoutPassword = { ...user.get(), password: undefined };

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the User details after take out the password. 
            return res.status(HTTP_STATUS.OK).json({ result: userWithoutPassword });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
            // Uses Sequelize (an ORM for Node.js) to fetch all entries in the Category table and sort them in ascending order based on the id column.
            const users = await User.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });

            // Create a version of the user object without including the user's password.
            const usersWithoutPassword = users.map(user => {
                const { password, ...userWithoutPassword } = user.get();
                return userWithoutPassword;
            });

            // Returns an HTTP 200 (OK) response with a JSON object containing the result property, which stores the User details after take out the password. 
            return res.status(HTTP_STATUS.OK).json({ result: usersWithoutPassword });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
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
        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table with id.
            // Check if the user variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await User.findByPk(id);
            if (!user) { return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.INVALID_USER }); };

            // Uses the getUserByToken function to obtain information about the user making the request, based on the token included in the request (req).
            const updatedBy = await getUserByToken(req);

            // Uses Sequelize (an ORM for Node.js) to delete the record represented by the user variable from the User table.
            await user.destroy();

            // Sets a cookie called TOKEN in the HTTP response, but with a lifetime (maxAge) set to 1 millisecond. This effectively expires the cookie immediately.
            res.cookie(TOKEN, '', { maxAge: 1 });

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.DELETE,
                table: USER,
                data: user.name,
                user: updatedBy.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the user was successfully deleted.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.DELETED_USER });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };
};

module.exports = UserController;