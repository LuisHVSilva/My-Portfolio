// Core Modules
const jwt = require('jsonwebtoken');

// Sensitive Data
const { secretJWT } = require('../sensitiveData/config');

/**
 * Create user Token for authentication and return it.
 * @param {User} user - User model.
 * @returns {string|null} Token string or null in case of error.
 */
const createUserToken = (user, time) => {
    try {
        const token = jwt.sign({
            name: user.name,
            id: user.id
        }, secretJWT, { expiresIn: time });

        return token;
    } catch (err) {
        throw new Error(`Erro ao criar token: ${err.message}`);
    };
};

module.exports = createUserToken;