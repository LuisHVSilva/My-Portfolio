// Core Modules
const { Router } = require('express');

// Custome Modules
const UserController = require('../controller/UserController');
const UserVerificationController = require('../controller/UserVerificationController')

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router();

// Route to register a User.
router.post(ROUTES.REGISTER_USER, UserController.register);

// Route to login a user.
router.post(ROUTES.LOGIN, UserController.login);

// Route to logout a user.
router.post(ROUTES.LOGOUT, authMiddleware, UserController.logout);

// Route to get all User registers.
router.get(ROUTES.GET_ALL_USER, authMiddleware, UserController.getAllUsers);

// Route to get a User with the user id.
router.get(ROUTES.GET_BY_USER_ID_USER, authMiddleware, UserController.getUserById);

// Route to edit a User.
router.patch(ROUTES.EDIT_USER, authMiddleware, UserController.edit);

// Route to delete a User.
router.delete(ROUTES.DELETE_USER, authMiddleware, UserController.delete);

// User Verification token.
router.post(ROUTES.REGISTER_VERIFICATION_USER_CODE, UserVerificationController.activeUser);
router.delete(ROUTES.DELETE_VERIFICATION_USER_CODE, authMiddleware, UserVerificationController.deleteTokens);

module.exports = router; 
