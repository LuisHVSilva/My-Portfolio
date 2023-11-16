// Core Modules
const { Router } = require('express');

// Custome Modules
const TagController = require('../controller/TagController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.post('/tag', authMiddleware, TagController.register);
router.get('/tag', TagController.getAllTag);
router.get('/tag/:id', authMiddleware, TagController.getTagByID);
router.patch('/tag/:id', authMiddleware, TagController.edit);
router.delete('/tag/:id', authMiddleware, TagController.delete);

module.exports = router;