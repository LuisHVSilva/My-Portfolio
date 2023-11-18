// Core Modules
const jwt = require('jsonwebtoken');

// Models
const { models } = require('../db/conn');
const User = models.User;

// Sensitive Data
const { SECRET_JWT } = require('../sensitiveData/config');

/**
 * Get User by cookie token.
 * @param {Request} req - HTTP Request object.
 * @returns {User||null} - User model or null.
 */
const getUserByToken = async (req) => {
    // Assigning the cookie value called "token" to the token variable.
    const authCookie = req.cookies.token;

    // Checks whether the token variable is null, undefined or an empty string.
    if (!authCookie) { return null };

    // Uses the verify function from the jsonwebtoken library. Used to verify the authenticity of a JWT token by decoding it and verifying the signature.
    const decoded = jwt.verify(authCookie, SECRET_JWT);
    
    // Extracts the user ID from the decode object.
    const userId = decoded.id;

    try {
        // Uses Sequelize (an ORM for Node.js) to search for a record in the User table with id.
        const user = await User.findByPk(userId);

        // Returns an object containing the user property.
        return user;
    } catch (err) {
        // Returns null if it is not possible to get the user by id.
        return null;
    };
};

module.exports = getUserByToken;