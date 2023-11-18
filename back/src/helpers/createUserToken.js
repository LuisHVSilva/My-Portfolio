// Core Modules
const jwt = require('jsonwebtoken');

// Sensitive Data
const { SECRET_JWT } = require('../sensitiveData/config');

// Constants
const { ERROR_MESSAGES } = require('../constants');

/**
 * Create user Token for authentication and return it.
 * @param {User} user - User model.
 * @returns {string|Error} Token string or a error.
 */
const createUserToken = (user, time) => {
    // Validation check to ensure that the user object contains required properties (name and id) before continuing with the program logic. 
    // If any of these conditions are not met, an error is thrown with an associated message.
    if (!user || typeof user !== 'object' || !user.name || !user.id) {
        throw new Error(ERROR_MESSAGES.CREATE_USER_TOKEN);
    }

    // Uses the jsonwebtoken library to generate a JWT token (JSON Web Token) based on information from the user object and a secret (secretJWT).
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, SECRET_JWT, { expiresIn: time });

    return token;
};

module.exports = createUserToken;