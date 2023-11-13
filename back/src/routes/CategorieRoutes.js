/*
    Configure application routes, associating each route with a specific controller function. Additionally, it uses a middleware called 'authMiddleware' to verify the authenticity of a token before allowing a categorie to edit it.

    * Code Explanation
    * ========================================================================================================================
    * Creating a Router Instance
    * ----------------------------
    const router = Router(): Creates a new router instance using the Express Router. This instance will be used to define the application's routes.
    
    * ----------------------------
    * Route Definition
    * ----------------------------    
    - router.post('/categories', CategorieController.register): Defines a POST route for categorie registration. When this route is triggered, the CategorieController.register controller will be called.    
    - router.get('/categories', authMiddleware, CategorieController.getAll): Defines a GET route to get all categories. When this route is triggered, the CategorieController.getAll controller will be called.    
    - router.patch('/categories/:id', authMiddleware, CategorieController.edit): Defines a PATCH route to edit a categorie based on their ID. Before calling the CategorieController.edit controller, the authMiddleware middleware will be executed.
    - router.delete('/categories/:id', authMiddleware, CategorieController.edit): Defines a DELETE route to delete a categorie based on their ID. Before calling the CategorieController.delete controller, the authMiddleware middleware will be executed.
*/

// Core Modules
const { Router } = require('express');

// Custome Modules
const CategorieController = require('../controller/CategorieController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');


const router = Router(); 
router.post('/categorie', authMiddleware, CategorieController.register);
router.get('/categorie', CategorieController.getAllCategorie);
router.get('/categorie/:id', authMiddleware, CategorieController.getCategorieById);
router.patch('/categorie/:id', authMiddleware, CategorieController.edit);
router.delete('/categorie/:id', authMiddleware, CategorieController.delete);

module.exports = router;