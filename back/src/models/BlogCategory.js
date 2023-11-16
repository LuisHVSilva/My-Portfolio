module.exports = (sequelize, DataTypes) => {
    const BlogCategory = sequelize.define('Blog_Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        category: {
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
    }, { timestamps: true, tableName: "Blog_Category"  });

    BlogCategory.associate = (models) => {
        BlogCategory.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        BlogCategory.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return BlogCategory;
};