module.exports = (sequelize, DataTypes) => {
    const UserVerification = sequelize.define('User_Verification', {
        // Primary key column.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // User id column
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Column with the code sent to the user.
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Column that stores a date and time and has a default value set to 15 minutes in the future.
        deleteTime: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'15 minutes\''),
            allowNull: false
        }
    }, { timestamps: false });

    // Defining associations between the User model and other models using Sequelize.
    UserVerification.associate = (models) => {
        // Many-to-one association with the User model to represent the user associated with a check.  
        UserVerification.belongsTo(models.User, { as: 'key', foreignKey: 'userId' });
    };

    return UserVerification;
};