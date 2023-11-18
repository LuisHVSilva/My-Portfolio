// Core Modules
const { Router } = require('express');

// Custome Modules
const TagController = require('../controller/TagController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router(); 
// Route to register a Tag.
router.post(ROUTES.REGISTER_TAG, authMiddleware, TagController.register);

// Route to get all Tag registers.
router.get(ROUTES.GET_ALL_TAG, TagController.getAllTag);

// Route to get a Tag with the tag id.
router.get(ROUTES.GET_BY_TAG_ID_TAG, TagController.getTagByID);

// Route to edit a Tag.
router.patch(ROUTES.EDIT_TAG, authMiddleware, TagController.edit);

// Route to delete a Tag.
router.delete(ROUTES.DELETE_TAG, authMiddleware, TagController.delete);

module.exports = router;