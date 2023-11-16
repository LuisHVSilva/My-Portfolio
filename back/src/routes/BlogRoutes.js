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