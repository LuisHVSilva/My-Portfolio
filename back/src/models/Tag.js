module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
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
    }, { timestamps: true, tableName: "Tag" });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Blog, { through: 'Blog_Tag', as: 'tag', foreignKey: 'tag', onDelete: 'CASCADE' });
        Tag.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        Tag.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return Tag;
};