module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Tag name column.
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
    }, { timestamps: true, tableName: "Tag" });

    // Defining associations between the Tag model and other models using Sequelize.
    Tag.associate = (models) => {
        // Many-to-many association with Blog model using join table 'Blog_Tag'.
        Tag.belongsToMany(models.Blog, { through: 'Blog_Tag', as: 'tag', foreignKey: 'tag', onDelete: 'CASCADE' });

        // Many-to-one association with the User model to represent the tag creator.
        Tag.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });

        // Many-to-one association with the User model to represent who made the last update to the tag.
        Tag.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return Tag;
};