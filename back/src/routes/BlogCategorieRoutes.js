// Core Modules
const { Router } = require('express');

// Custome Modules
const BlogCategorieController = require('../controller/BlogCategorieController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/blogcategorie', authMiddleware, BlogCategorieController.register);
router.get('/blogcategorie', BlogCategorieController.getAllBlogCategorie);
router.get('/blogcategorie/blog/:id', authMiddleware, BlogCategorieController.getBlogCategorieByBlog);
router.get('/blogcategorie/categorie/:id', BlogCategorieController.getBlogCategorieByCategorie);
router.delete('/blogcategorie/delete', authMiddleware, BlogCategorieController.deleteByCategorie);


module.exports = router;