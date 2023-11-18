// Models
const { sequelize, models } = require('../db/conn');
const UserVerification = models.User_Verification;
const User = models.User;

// Constants
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, LOG_OPTIONS } = require('../constants');

// Local constans
const STRING_DATE = new Date().toISOString();
const NOW = new Date(STRING_DATE)
const TOKEN_LENGTH = 5;
const USER_VERIFICATION = 'User_Verification';
const ALL = 'Todos';
const ADMIN = 'Admin';

// Helpers
const inserLog = require('../helpers/insertLog');

class UserVerificationController {
    static async activeUser(req, res) {
        // Destructuring assignment to extract the properties from the req.body object and assign them to separate variables.
        const { token } = req.body;

        // Destructuring assignment to extract the id propertie from the req.params object and assign it to a separate variable.
        const { id } = req.params;

        // Checks whether the length of the token variable is different from 5. 
        // If the condition is true, it means that the token is not exactly 5 characters long, and the code returns an HTTP 422 (UNPROCESSABLE_ENTITY) response with a JSON object containing an error message indicating that It is necessary to fill in all fields.
        if (token.length !== TOKEN_LENGTH) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_CONFIRM_USER_LENGTH }) };

        try {
            // Uses Sequelize (an ORM for Node.js) to search for a record in the UserVerification table where the userId amd token columns are equals to the value of the token and id variables.
            // Check if the code variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const code = await UserVerification.findOne({ where: { userId: id, token: token } });
            if (!code) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.INVALID_CONFIRM_USER_DATA }); };

            // checks if the current date (NOW) is later than the code expiration time (code.deleteTime). 
            // If the condition is true, it means the code is expired, and the code returns an HTTP 422 (UNPROCESSABLE_ENTITY) response with a JSON object containing an error message indicating that the code is expired.
            if (NOW > code.deleteTime) { return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({ error: ERROR_MESSAGES.EXPIRED_TIME_CONFIRM_USER_TOKEN }); }

            // Uses Sequelize (an ORM for Node.js) to search for a record in the User table with id.
            // Check if the user variables contain any results. If there is no result, it returns an HTTP 404 (NOT_FOUND) response.
            const user = await User.findByPk(id);
            if (!user) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_USER }); };            

            // Updating the user available propertie to 'true'.
            user.available = true;

            // Saves changes made to the user object in the database.
            user.save();

            // Uses Sequelize (an ORM for Node.js) to delete the record represented by the tag variable from the Tag table.
            code.destroy();

            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.AVALILABLE,
                user: user.name
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the user was successfully verificated.
            return res.status(HTTP_STATUS.OK).json({ result: SUCCESS_MESSAGES.AUTHENTICATED_USER });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        };
    };

    static async deleteTokens(req, res) {
        try {
            // Delete records from the UserVerification table where the deleteTime column value is greater than the current date (NOW).
            await UserVerification.destroy({ where: { deleteTime: { [sequelize.gt]: NOW } } });
            
            // Calls the insertLog function passing an object as an argument.
            await inserLog({
                order: LOG_OPTIONS.DELETE,
                table: USER_VERIFICATION,
                data: ALL,
                user: ADMIN
            })

            // Returns an HTTP 200 (OK) response with a JSON object containing the message property indicating that the tokens was successfully deleted.
            return res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.DELETED_AUTHENTICATED_TOKEN });
        } catch (error) {
            // Returns an HTTP 500 response (INTERNAL_SERVER_ERROR) in case of an error during processing.
            // The returned JSON object contains an error property with the error message extracted from the error.message object.
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    };
};

module.exports = UserVerificationController;