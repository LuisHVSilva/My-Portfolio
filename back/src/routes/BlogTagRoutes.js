// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogTagController = require('../controller/BlogTagController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/blogtag', authMiddleware, BlogTagController.register);
router.get('/blogtag', BlogTagController.getAllBlogTag);
router.get('/blogtag/blog/:id', authMiddleware, BlogTagController.getBlogTagByBlog);
router.get('/blogtag/tag/:id', authMiddleware, BlogTagController.getBlogTagByTag);
router.delete('/blogtag/delete', authMiddleware, BlogTagController.deleteByTag);

module.exports = router;