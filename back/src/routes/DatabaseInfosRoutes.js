// Core Modules
const { Router } = require('express');

// Custome Modules
const DatabaseInfosController = require('../controller/DatabaseInfosController');

// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Sensitive Data
const { ROUTES } = require('../sensitiveData/config');

const router = Router(); 

// Route to get all tables in database.
router.get(ROUTES.GET_ALL_TABLES, authMiddleware, DatabaseInfosController.getTables);

// Route to get all columns of a table.
router.get(ROUTES.GET_TABLE_COLUMNS, authMiddleware, DatabaseInfosController.getColumns);

// Route to get all logs in database.
router.get(ROUTES.GET_ALL_LOGS, authMiddleware, DatabaseInfosController.getLogs);

module.exports = router;