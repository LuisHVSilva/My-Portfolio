module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
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
    }, { timestamps: true, tableName: "Categorie" });

    Categorie.associate = (models) => {
        Categorie.belongsToMany(models.Blog, { through: 'Blog_Categorie', as: 'categorie', foreignKey: 'categorie', onDelete: 'CASCADE' });
        Categorie.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        Categorie.belongsTo(models.User, { as: 'updated', foreignKey: 'updatedBy' });
    };

    return Categorie;
};
