/*
    Configure application routes, associating each route with a specific controller function. Additionally, it uses a middleware called 'authMiddleware' to verify the authenticity of a token before allowing a user to edit it.

    * Code Explanation
    * ========================================================================================================================
    * Creating a Router Instance
    * ----------------------------
    const router = Router(): Creates a new router instance using the Express Router. This instance will be used to define the application's routes.
    
    * ----------------------------
    * Route Definition
    * ----------------------------    
    - router.post('/user', UserController.register): Defines a POST route for user registration. When this route is triggered, the UserController.register controller will be called.
    - router.post('/', UserController.login): Defines a POST route for user login. When this route is triggered, the UserController.login controller will be called.
    - router.get('/user/', authMiddleware, UserController.getAll): Defines a GET route to get all users. When this route is triggered, the UserController.getAll controller will be called.    
    - router.patch('/user/:id', authMiddleware, UserController.edit): Defines a PATCH route to edit a user based on their ID. Before calling the UserController.edit controller, the authMiddleware middleware will be executed.
    - router.delete('/user/:id', authMiddleware, UserController.edit): Defines a DELETE route to delete a user based on their ID. Before calling the UserController.delete controller, the authMiddleware middleware will be executed.
*/

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
