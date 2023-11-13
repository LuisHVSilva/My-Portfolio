module.exports = (sequelize, DataTypes) => {
    const UserVerification = sequelize.define('User_Verification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleteTime: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'15 minutes\''),
            allowNull: false
        }
    }, { timestamps: false });

    UserVerification.associate = (models) => {
        UserVerification.belongsTo(models.User, { as: 'key', foreignKey: 'userId' });
    };

    return UserVerification;
};