// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogCategoryController = require('../controller/BlogCategoryController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router();

// Route to register a Blog_Category.
router.post(ROUTES.REGISTER_BLOG_CATEGORY, authMiddleware, BlogCategoryController.register);

// Route to get all Blog_Category registers.
router.get(ROUTES.GET_ALL_BLOG_CATEGORY, BlogCategoryController.getAllBlogCategory);

// Route to get a Blog_Category with the blog id.
router.get(ROUTES.GET_BY_BLOG_ID_BLOG_CATEGORY, BlogCategoryController.getBlogCategoryByBlog);

// Route to get a Blog_Category with the category id.
router.get(ROUTES.GET_BY_CATEGORY_ID_BLOG_CATEGORY, BlogCategoryController.getBlogCategoryByCategory);

// Route to delete a Blog_Category.
router.delete(ROUTES.DELETE_BLOG_CATEGORY, authMiddleware, BlogCategoryController.deleteByCategory);

module.exports = router;