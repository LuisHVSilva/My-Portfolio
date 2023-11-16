// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogCategoryController = require('../controller/BlogCategoryController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/blogcategory', authMiddleware, BlogCategoryController.register);
router.get('/blogcategory', BlogCategoryController.getAllBlogCategory);
router.get('/blogcategory/blog/:id', authMiddleware, BlogCategoryController.getBlogCategoryByBlog);
router.get('/blogcategory/category/:id', BlogCategoryController.getBlogCategoryByCategory);
router.delete('/blogcategory/delete', authMiddleware, BlogCategoryController.deleteByCategory);


module.exports = router;