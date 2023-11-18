module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // User name column.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // User email column.
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // User password column.
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Column to define whether the user is available or not
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, { timestamps: true, tableName: 'User' })

    // Defining associations between the User model and other models using Sequelize.
    User.associate = (models) => {
        // One-to-many association with the User_Verification model to represent verification codes associated with a user.
        User.hasMany(models.User_Verification, { as: 'userCode', foreignKey: 'userId' });

        // One-to-many association with the Blog model to represent blogs created by a user.
        User.hasMany(models.Blog, { as: 'createdBlogs', foreignKey: 'createdBy' });

        // One-to-many association with the Blog model to represent blogs updated by a user.
        User.hasMany(models.Blog, { as: 'updatedBlogs', foreignKey: 'updatedBy' });

        // One-to-many association with the Tag model to represent tags created by a user.
        User.hasMany(models.Tag, { as: 'createdTags', foreignKey: 'createdBy' });

        // One-to-many association with the Tag model to represent tags updated by a user.
        User.hasMany(models.Tag, { as: 'updatedTags', foreignKey: 'updatedBy' });

        // One-to-many association with the Category model to represent categories created by a user.
        User.hasMany(models.Category, { as: 'createdCategorys', foreignKey: 'createdBy' });

        // One-to-many association with the Category model to represent categories updated by a user.
        User.hasMany(models.Category, { as: 'updatedCategorys', foreignKey: 'updatedBy' });

        // One-to-many association with the Blog_Tag model to represent associations between blogs and tags created by a user.
        User.hasMany(models.Blog_Tag, { as: 'createdBlogTags', foreignKey: 'createdBy' });

        // One-to-many association with the Blog_Tag model to represent associations between blogs and tags updated by a user.
        User.hasMany(models.Blog_Tag, { as: 'updatedBlogTags', foreignKey: 'updatedBy' });

        // One-to-many association with the Blog_Category model to represent associations between blogs and categories created by a user.
        User.hasMany(models.Blog_Category, { as: 'createdBlogCategorys', foreignKey: 'createdBy' });

        // One-to-many association with the Blog_Category model to represent associations between blogs and categories updated by a user.
        User.hasMany(models.Blog_Category, { as: 'updatedBlogCategorys', foreignKey: 'updatedBy' });
    };


    return User;
};