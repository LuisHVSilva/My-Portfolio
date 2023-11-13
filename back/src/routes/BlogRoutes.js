/*
    Configure application routes, associating each route with a specific controller function. Additionally, it uses a middleware called 'authMiddleware' to verify the authenticity of a token before allowing a blog to edit it.

    * Code Explanation
    * ========================================================================================================================
    * Creating a Router Instance
    * ----------------------------
    const router = Router(): Creates a new router instance using the Express Router. This instance will be used to define the application's routes.
    
    * ----------------------------
    * Route Definition
    * ----------------------------    
    - router.post('/blog', BlogController.register): Defines a POST route for blog registration. When this route is triggered, the BlogController.register controller will be called.    
    - router.get('/blog', authMiddleware, BlogController.getAll): Defines a GET route to get all blog. When this route is triggered, the BlogController.getAll controller will be called.    
    - router.patch('/blog/:id', authMiddleware, BlogController.edit): Defines a PATCH route to edit a blog based on their ID. Before calling the BlogController.edit controller, the authMiddleware middleware will be executed.
    - router.delete('/blog/:id', authMiddleware, BlogController.edit): Defines a DELETE route to delete a blog based on their ID. Before calling the BlogController.delete controller, the authMiddleware middleware will be executed.
*/

// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogController = require('../controller/BlogController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/blog', authMiddleware, BlogController.register);
router.get('/blog', BlogController.getAllBlog);
router.get('/blog/:id', BlogController.getBlogById);
router.patch('/blog/:id', authMiddleware, BlogController.edit);
router.delete('/blog/:id', authMiddleware, BlogController.delete);

module.exports = router;