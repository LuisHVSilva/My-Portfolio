// Core Modules
const jwt = require('jsonwebtoken');

// Sensitive Data
const { secretJWT } = require('../sensitiveData/config');

// Constants
const { HTTP_STATUS } = require('../constants');

/**
 * Check if token is valid.
 * @param {Request} req - HTTP Request object.
 * @param {Response} res - HTTP Response Object.
 * @param {Function} next - The middleware function to call the next step..
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {    
    const authCookie = req.cookies.token;
    if (!authCookie) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Acesso negado.' }); };

    try {
        const verified = jwt.verify(authCookie, secretJWT);
        req.user = verified;        

        next();
    } catch (err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Token inválido.' });
    };
};

module.exports = authMiddleware;