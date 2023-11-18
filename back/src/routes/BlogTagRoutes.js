// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogTagController = require('../controller/BlogTagController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router();

// Route to register a Blog_Tag.
router.post(ROUTES.REGISTER_BLOG_TAG, authMiddleware, BlogTagController.register);

// Route to get all Blog_Tag registers.
router.get(ROUTES.GET_ALL_BLOG_TAG, BlogTagController.getAllBlogTag);

// Route to get a Blog_Tag with the blog id.
router.get(ROUTES.GET_BY_BLOG_ID_BLOG_TAG, BlogTagController.getBlogTagByBlog);

// Route to get a Blog_Tag with the category id.
router.get(ROUTES.GET_BY_TAG_ID_BLOG_TAG, BlogTagController.getBlogTagByTag);

// Route to delete a Blog_Tag.
router.delete(ROUTES.DELETE_BLOG_TAG, authMiddleware, BlogTagController.deleteByTag);

module.exports = router;