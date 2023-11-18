// Core Modules
const { Router } = require('express');

// Custome Modules
const CategoryController = require('../controller/CategoryController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router(); 
// Route to register a Category.
router.post(ROUTES.REGISTER_CATEGORY, authMiddleware, CategoryController.register);

// Route to get all Category registers.
router.get(ROUTES.GET_ALL_CATEGORY, CategoryController.getAllCategory);

// Route to get a Category with the category id.
router.get(ROUTES.GET_BY_CATEGORY_ID_CATEGORY, CategoryController.getCategoryById);

// Route to edit a Category.
router.patch(ROUTES.EDIT_CATEGORY, authMiddleware, CategoryController.edit);

// Route to delete a Category.
router.delete(ROUTES.DELETE_CATEGORY, authMiddleware, CategoryController.delete);

module.exports = router;