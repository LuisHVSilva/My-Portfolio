// Core Modules
const { Router } = require('express');

// Custome Modules
const CategoryController = require('../controller/CategoryController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');


const router = Router(); 
router.post('/category', authMiddleware, CategoryController.register);
router.get('/category', CategoryController.getAllCategory);
router.get('/category/:id', authMiddleware, CategoryController.getCategoryById);
router.patch('/category/:id', authMiddleware, CategoryController.edit);
router.delete('/category/:id', authMiddleware, CategoryController.delete);

module.exports = router;