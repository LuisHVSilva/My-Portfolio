// Core Modules
const { Sequelize } = require('sequelize');

// Sensitive Data
const { database } = require('../sensitiveData/config');

const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,
    {
        dialect: 'postgres',
        host: database.host,
        port: database.port,
        ssl: true
    }
);

const models = {
    User: require('../models/User')(sequelize, Sequelize),
    Blog: require('../models/Blog')(sequelize, Sequelize),
    Tag: require('../models/Tag')(sequelize, Sequelize),
    Categorie: require('../models/Categorie')(sequelize, Sequelize),
    Blog_Tag: require('../models/BlogTag')(sequelize, Sequelize),
    Blog_Categorie: require('../models/BlogCategorie')(sequelize, Sequelize),
    Update_Logs: require('../models/UpdateLog')(sequelize, Sequelize),
    User_Verification: require('../models/UserVerification')(sequelize, Sequelize),
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = { models, sequelize };