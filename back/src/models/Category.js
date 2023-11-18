module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Category name column.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Column with the id of the user who created the data in the database.
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Column with the id of the user who updated the data in the database
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: true, tableName: "Category" });

    // Defining associations between the Category model and other models using Sequelize.
    Category.associate = (models) => {
        // Many-to-many association with Blog model using join table 'Blog_Category'.
        Category.belongsToMany(models.Blog, { through: 'Blog_Category', as: 'category', foreignKey: 'category', onDelete: 'CASCADE' });

        // Many-to-one association with the User model to represent the category creator.
        Category.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });

        // Many-to-one association with the User model to represent who made the last update to the category.
        Category.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };


    return Category;
};
