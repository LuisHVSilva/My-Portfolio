// Core Modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// DB Connection
const conn = require('./db/conn');

// Routes
const UserRoutes = require('./routes/UserRoutes');
const TagRoutes = require('./routes/TagRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const BlogRoutes = require('./routes/BlogRoutes');
const BlogTagRoutes = require('./routes/BlogTagRoutes');
const BlogCategoryRoutes = require('./routes/BlogCategoryRoutes');
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
app.use(adminURL, CategoryRoutes);
app.use(adminURL, BlogRoutes);
app.use(adminURL, BlogTagRoutes);
app.use(adminURL, BlogCategoryRoutes);
app.use(adminURL, DatabaseInfosRoutes);


// conn.sequelize.sync({force: true});

const port = process.env.PORT || 5000
conn.sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log("Aplicação rodando na porta: " + port);
  })
  .catch((err) => console.log(err));


