module.exports = (sequelize, DataTypes) => {
    const BlogTag = sequelize.define('Blog_Tag', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Tag id column.
        tag: {
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
    }, { timestamps: true, tableName: "Blog_Tag" });

    // Defining associations between the Blog_Tag model and other models using Sequelize.
    BlogTag.associate = (models) => {
        // Many-to-one association with the User model to represent the blog_category creator.
        BlogTag.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });

        // Many-to-one association with the User model to represent who made the last update to the blog_category.
        BlogTag.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return BlogTag;
};