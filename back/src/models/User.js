module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, { timestamps: true, tableName: 'User' })

    User.associate = (models) => {
        User.hasMany(models.User_Verification, { as: 'userCode', foreignKey: 'userId' });
        User.hasMany(models.Blog, { as: 'createdBlogs', foreignKey: 'createdBy' });
        User.hasMany(models.Blog, { as: 'updatedBlogs', foreignKey: 'updatedBy' });
        User.hasMany(models.Tag, { as: 'createdTags', foreignKey: 'createdBy' });
        User.hasMany(models.Tag, { as: 'updatedTags', foreignKey: 'updatedBy' });
        User.hasMany(models.Categorie, { as: 'createdCategories', foreignKey: 'createdBy' });
        User.hasMany(models.Categorie, { as: 'updatedCategories', foreignKey: 'updatedBy' });
        User.hasMany(models.Blog_Tag, { as: 'createdBlogTags', foreignKey: 'createdBy' });
        User.hasMany(models.Blog_Tag, { as: 'updatedBlogTags', foreignKey: 'updatedBy' });
        User.hasMany(models.Blog_Categorie, { as: 'createdBlogCategories', foreignKey: 'createdBy' });
        User.hasMany(models.Blog_Categorie, { as: 'updatedBlogCategories', foreignKey: 'updatedBy' });
    };

    return User;
};