/*
  This code configures an Express server that uses middleware to interpret JSON and allow requests from a specific source. It also defines routes for the application and synchronizes the model with the database before starting the server on port 5000.

  * Code Explanation
  * ========================================================================================================================
  * Creating an Express Application Instance
  * ----------------------------  
  const app = express(): Creates an instance of the Express application.

  * ----------------------------  
  * Middleware Configuration
  * ----------------------------  
  app.use(express.json()): Adds middleware to interpret the request body as JSON.
  app.use(cors({credentials: true, origin: 'http://localhost:5173'})): Adds the cors middleware to allow requests from a specific origin (http://localhost:5173). Additionally, credentials: true indicates that request headers can include credentials.

  * ----------------------------  
  * Addition of Routes
  * ----------------------------    
  app.use(adminURL, UserRoutes): Defines that the routes defined in UserRoutes will be available under the prefix defined in configBack.adminURL.

  * ----------------------------  
  * Database Synchronization and Server Initialization
  * ----------------------------    
  conn.sync().then(() => {...}).catch((err) => console.log(err)): Synchronizes the model with the database and, if successful, starts the Express server on port 5000. If an error occurs during synchronization, the error will be logged to the console.
*/


// Core Modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// DB Connection
const conn = require('./db/conn');

// Routes
const UserRoutes = require('./routes/UserRoutes');
const TagRoutes = require('./routes/TagRoutes');
const CategorieRoutes = require('./routes/CategorieRoutes');
const BlogRoutes = require('./routes/BlogRoutes');
const BlogTagRoutes = require('./routes/BlogTagRoutes');
const BlogCategorieRoutes = require('./routes/BlogCategorieRoutes');
const DatabaseInfosRoutes = require('./routes/DatabaseInfosRoutes');

// Sensitive Data
const { adminURL } = require('./sensitiveData/config');

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['Set-Cookie', 'Date', 'ETag'],
  methods: 'GET, HEAD, PATCH, POST, DELETE'
}));
app.use(cookieParser());

app.use(adminURL, UserRoutes);
app.use(adminURL, TagRoutes);
app.use(adminURL, CategorieRoutes);
app.use(adminURL, BlogRoutes);
app.use(adminURL, BlogTagRoutes);
app.use(adminURL, BlogCategorieRoutes);
app.use(adminURL, DatabaseInfosRoutes);


// conn.sequelize.sync({force: true});

const port = process.env.PORT || 5000
conn.sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log("Aplicação rodando na porta: " + port);
  })
  .catch((err) => console.log(err));


