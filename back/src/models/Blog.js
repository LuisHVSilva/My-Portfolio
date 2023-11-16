/*    
    Defines a tags model in the Blog variable.
    The model has the fields 'id', 'name', 'updatedBy', 'createdBy' and 'timestamp' for the dates of creation and update of data in the database.
    
    * Specification of Blog data
    * ========================================================================================================================
    - title: Text title;
    - subtitle: Text subtitle;
    - text: the text;
    - image_one: first image (can be null);
    - image_two: second image (can be null);
    - image_three: third image (can be null);
    - createdBy: user id that updated the tag (integer);
    - timestamps: 
        - createAt: the date and time a new database entry was created (Date);
        - updateAt: the date and time automatically updated whenever an existing entry in the database is modified (Date).
    - Blog.belongsTo(User, {as: 'createdBy'}): Define the relationchip between User and Blog, where the createdBy field define the user who created the data.    
*/

module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image_one: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_two: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_three: {
            type: DataTypes.STRING,
            allowNull: true
        },
        highlight: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
    }, { timestamps: true, tableName: "Blog" });

    Blog.associate = (models) => {
        Blog.belongsToMany(models.Tag, { through: 'Blog_Tag', as: 'blog_tag', foreignKey: 'blog', onDelete: 'CASCADE' });
        Blog.belongsToMany(models.Category, { through: 'Blog_Category', as: 'blog_category', foreignKey: 'blog', onDelete: 'CASCADE' });
        Blog.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        Blog.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return Blog;
};
