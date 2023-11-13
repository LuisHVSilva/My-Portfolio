module.exports = (sequelize, DataTypes) => {
    const BlogTag = sequelize.define('Blog_Tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
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
    }, { timestamps: true, tableName: "Blog_Tag" });

    BlogTag.associate = (models) => {
        BlogTag.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        BlogTag.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return BlogTag;
};