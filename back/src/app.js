// Core Modules.
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// DB Connection.
const conn = require('./db/conn');

// Routes.
const UserRoutes = require('./routes/UserRoutes');
const TagRoutes = require('./routes/TagRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const BlogRoutes = require('./routes/BlogRoutes');
const BlogTagRoutes = require('./routes/BlogTagRoutes');
const BlogCategoryRoutes = require('./routes/BlogCategoryRoutes');
const DatabaseInfosRoutes = require('./routes/DatabaseInfosRoutes');

// Sensitive Data.
const { ADMIN_URL, CORS_URL } = require('./sensitiveData/config');

// Local constants.
const port = process.env.PORT || 5000;

// Creates an instance of the Express.js framework.
const app = express();

// Configures the express.json() middleware in the Express application. 
// This middleware is responsible for parsing the body of HTTP requests that contain data in JSON format. 
// It converts the JSON body of the request into a JavaScript object that can be easily manipulated in code.
// app.use(express.json());

// Middleware that parses the body of HTTP requests that contain data in JSON format.
// The "limit: '5mb'"" option sets a limit to the size of the JSON body that the middleware can process. 
// This can be useful to prevent the server from being overloaded with large loads of JSON data.
app.use(bodyParser.json({ limit: '5mb' }));

// Configures CORS (Cross-Origin Resource Sharing) middleware in the Express application using the cors package. 
// CORS is a security mechanism that allows or restricts a web page's resources to be requested from a domain other than the domain that served the web page.
// 1. credentials: true: Allows sending cookies and authentication headers in requests from different origins.
// 2. origin: Specifies the domain(s) allowed to make requests to the server.
// 3. exposedHeaders: ['Set-Cookie', 'Date', 'ETag']: List of additional headers that the browser is allowed to expose to client code.
// 4. methods: 'GET, PATCH, POST, DELETE': Specifies the HTTP methods allowed for CORS requests.
app.use(cors({
  credentials: true,
  origin: CORS_URL,  
  exposedHeaders: ['Set-Cookie', 'Date', 'ETag'],
  methods: 'GET, PATCH, POST, DELETE'
}));

// Configures the cookieParser middleware in the Express application. 
// The cookieParser is a middleware that parses cookies attached to HTTP requests and makes the cookie information accessible in the req object.
app.use(cookieParser());

// Configure routes in the Express app. 
// Each line represents the use of a route middleware to handle HTTP requests over a specific path, which is prefixed by the value of the ADMIN_URL variable.
app.use(ADMIN_URL, UserRoutes);
app.use(ADMIN_URL, TagRoutes);
app.use(ADMIN_URL, CategoryRoutes);
app.use(ADMIN_URL, BlogRoutes);
app.use(ADMIN_URL, BlogTagRoutes);
app.use(ADMIN_URL, BlogCategoryRoutes);
app.use(ADMIN_URL, DatabaseInfosRoutes);

 
// conn.sequelize.sync({force: true});

// Uses the sync() method provided by Sequelize to synchronize the defined model with the database. 
// After successful synchronization, it starts the Express server to listen for requests on the specified port.
conn.sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log("Aplicação rodando na porta: " + port);
  })
  .catch((err) => console.log(err));


