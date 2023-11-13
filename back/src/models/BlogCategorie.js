module.exports = (sequelize, DataTypes) => {
    const BlogCategorie = sequelize.define('Blog_Categorie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        categorie: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        blog: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: true, tableName: "Blog_Categorie"  });

    BlogCategorie.associate = (models) => {
        BlogCategorie.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        BlogCategorie.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return BlogCategorie;
};