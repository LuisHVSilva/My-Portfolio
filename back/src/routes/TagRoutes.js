/*
    Configure application routes, associating each route with a specific controller function. Additionally, it uses a middleware called 'authMiddleware' to verify the authenticity of a token before allowing a tag to edit it.

    * Code Explanation
    * ========================================================================================================================
    * Creating a Router Instance
    * ----------------------------
    const router = Router(): Creates a new router instance using the Express Router. This instance will be used to define the application's routes.
    
    * ----------------------------
    * Route Definition
    * ----------------------------    
    - router.post('/tags', TagController.register): Defines a POST route for tag registration. When this route is triggered, the TagController.register controller will be called.    
    - router.get('/tags', authMiddleware, TagController.getAll): Defines a GET route to get all tags. When this route is triggered, the TagController.getAll controller will be called.    
    - router.patch('/tags/:id', authMiddleware, TagController.edit): Defines a PATCH route to edit a tag based on their ID. Before calling the TagController.edit controller, the authMiddleware middleware will be executed.
    - router.delete('/tags/:id', authMiddleware, TagController.edit): Defines a DELETE route to delete a tag based on their ID. Before calling the TagController.delete controller, the authMiddleware middleware will be executed.
*/

// Core Modules
const { Router } = require('express');

// Custome Modules
const TagController = require('../controller/TagController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/tag', authMiddleware, TagController.register);
router.get('/tag', TagController.getAllTag);
router.get('/tag/:id', authMiddleware, TagController.getTagByID);
router.patch('/tag/:id', authMiddleware, TagController.edit);
router.delete('/tag/:id', authMiddleware, TagController.delete);

module.exports = router;