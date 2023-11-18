// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogController = require('../controller/BlogController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router(); 

// Route to register a Blog.
router.post(ROUTES.REGISTER_BLOG, authMiddleware, BlogController.register);

// Route to get all Blog registers.
router.get(ROUTES.GET_ALL_BLOG, BlogController.getAllBlog);

// Route to get a Blog with the blog id.
router.get(ROUTES.GET_BY_BLOG_ID_BLOG, BlogController.getBlogById);

// Route to edit a Blog.
router.patch(ROUTES.EDIT_BLOG, authMiddleware, BlogController.edit);

// Route to delete a Blog.
router.delete(ROUTES.DELETE_BLOG, authMiddleware, BlogController.delete);

module.exports = router;