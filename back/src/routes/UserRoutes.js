// Core Modules
const { Router } = require('express');

// Custome Modules
const UserController = require('../controller/UserController');
const UserVerificationController = require('../controller/UserVerificationController')

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/', UserController.login);
router.post('/user', UserController.register);
router.post('/logout', authMiddleware, UserController.logout);
router.get('/user', authMiddleware, UserController.getAllUsers);
router.get('/user/:id', authMiddleware, UserController.getUserById);
router.patch('/user/:id', authMiddleware, UserController.edit);
router.delete('/user/:id', authMiddleware, UserController.delete);

// User Verification token.
router.post('/verification/:id', UserVerificationController.activeUser);
router.delete('/verification/delete', authMiddleware, UserVerificationController.deleteTokens);

module.exports = router; 
