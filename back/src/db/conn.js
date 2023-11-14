// Core Modules
const { Sequelize } = require('sequelize');

// Sensitive Data
const { database } = require('../sensitiveData/config');

const databaseURL = process.env.database || database.renderExternalURL;

const sequelize = new Sequelize(databaseURL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,  
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS          
        }
    }
});

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


// const sequelize = new Sequelize(
//     database.database,
//     database.user,
//     database.password,
//     {
//         dialect: 'postgres',
//         host: database.host,
//         port: database.port,
//         ssl: true
//     }
// );


// Testar a conexão
// async function testarConexao() {
//     try {
//         await sequelize.authenticate();
//         console.log('Conexão bem-sucedida.');
//     } catch (error) {
//         console.error('Erro ao conectar ao banco de dados:', error);
//     } finally {
//         // Certifique-se de sempre fechar a conexão, mesmo que o teste falhe.
//         await sequelize.close();
//     }
// }

// // Chame a função para testar a conexão
// testarConexao();