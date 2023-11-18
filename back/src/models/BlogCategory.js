module.exports = (sequelize, DataTypes) => {
    const BlogCategory = sequelize.define('Blog_Category', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Category id column.
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Blog id column.
        blog: {
            type: DataTypes.INTEGER,
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
    }, { timestamps: true, tableName: "Blog_Category"  });

    // Defining associations between the Blog_Category model and other models using Sequelize.
    BlogCategory.associate = (models) => {
        // Many-to-one association with the User model to represent the blog_category creator.
        BlogCategory.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });

        // Many-to-one association with the User model to represent who made the last update to the blog_category.
        BlogCategory.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return BlogCategory;
};