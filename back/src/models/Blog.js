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
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Blog title column.
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Blog subtitle column.
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Blog text column.
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // Blog first image column.
        image_one: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Blog second image column.
        image_two: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Blog third image column.
        image_three: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Column to determine whether the blog is highlighted or not.
        highlight: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
    }, { timestamps: true, tableName: "Blog" });

    // Defining associations between the Blog model and other models using Sequelize.
    Blog.associate = (models) => {
        // Many-to-many association with Tag model using join table 'Blog_Tag'.
        Blog.belongsToMany(models.Tag, { through: 'Blog_Tag', as: 'blog_tag', foreignKey: 'blog', onDelete: 'CASCADE' });

        // Many-to-many association with Category model using join table 'Blog_Category'.
        Blog.belongsToMany(models.Category, { through: 'Blog_Category', as: 'blog_category', foreignKey: 'blog', onDelete: 'CASCADE' });

        // Many-to-one association with the User model to represent the blog creator.
        Blog.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });

        // Many-to-one association with the User model to represent who made the last update to the blog.
        Blog.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };


    return Blog;
};
