module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
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
    }, { timestamps: true, tableName: "Category" });

    Category.associate = (models) => {
        Category.belongsToMany(models.Blog, { through: 'Blog_Category', as: 'category', foreignKey: 'category', onDelete: 'CASCADE' });
        Category.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        Category.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return Category;
};
