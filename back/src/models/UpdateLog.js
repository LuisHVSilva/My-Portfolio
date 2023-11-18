module.exports = (sequelize, DataTypes) => {
    const UpdateLog = sequelize.define('Update_Log', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Column that contains the explanatory text of what was changed in the database.
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Column with the id of the user who created the data in the database.
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        },        
    }, { timestamps: true });    

    return UpdateLog;
};