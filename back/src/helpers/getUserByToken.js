// Core Modules
const jwt = require('jsonwebtoken');

// Models
const { models } = require('../db/conn');
const User = models.User;

// Sensitive Data
const { secretJWT } = require('../sensitiveData/config');

/**
 * Get User by cookie token.
 * @param {Request} req - HTTP Request object.
 * @returns {User||null} - User model or null.
 */
const getUserByToken = async (req) => {
    const token = req.cookies.token;
    if (!token) { return null };

    const decoded = jwt.verify(token, secretJWT);
    const userId = decoded.id;

    try {
        const user = await User.findByPk(userId);

        return user;
    } catch (err) {
        return null;
    };
};

module.exports = getUserByToken;