module.exports = (sequelize, DataTypes) => {
    const UpdateLog = sequelize.define('Update_Log', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        },        
    }, { timestamps: true });    

    return UpdateLog;
};