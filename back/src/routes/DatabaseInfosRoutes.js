// Core Modules
const { Router } = require('express');

// Custome Modules
const DatabaseInfosController = require('../controller/DatabaseInfosController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router(); 
router.get('/tables', authMiddleware, DatabaseInfosController.getTables);
router.get('/tables/:table_name', authMiddleware, DatabaseInfosController.getColumns);
router.get('/log', authMiddleware, DatabaseInfosController.getLogs);

module.exports = router;