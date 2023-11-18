// Core Modules
const jwt = require('jsonwebtoken');

// Sensitive Data
const { SECRET_JWT } = require('../sensitiveData/config');

// Constants
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

/**
 * Check if token is valid.
 * @param {Request} req - HTTP Request object.
 * @param {Response} res - HTTP Response Object.
 * @param {Function} next - The middleware function to call the next step..
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
    // Assigning the cookie value called "token" to the token variable.
    const authCookie = req.cookies.token;

    // Checks whether the authCookie variable is falsy (i.e. undefined, null, false, 0, "", or NaN). 
    // If the condition is true, it means there is no authentication cookie present, and the code returns an HTTP 401 (UNAUTHORIZED) response with a JSON object containing an error message indicating unauthorized access.
    if (!authCookie) { return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.DENIED_ACCESS }) };

    try {
        // Uses the verify function from the jsonwebtoken library. Used to verify the authenticity of a JWT token by decoding it and verifying the signature.
        const verified = jwt.verify(authCookie, SECRET_JWT);

        // This code snippet assigns the verified object, which contains the decoded JWT token data, to the user property of the request object (req)
        req.user = verified;

        // Function used to pass control to the next middleware function in the stack.
        next();
    } catch (err) {
        // Returns an HTTP 401 (UNAUTHORIZED) response with a JSON object containing an error message indicating that the token is invalid.
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    };
};

module.exports = authMiddleware;