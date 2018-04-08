module.exports = (sequelize, DataTypes) => {
    let UserInfo = sequelize.define('UserInfo', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
        },
        first_name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        last_name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        messenger_id: {
            type: DataTypes.STRING,
            defaultValue: null
        },
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'User_Info',
        });

    UserInfo.associate = (models) => {
        models.UserInfo.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    }
    
    return UserInfo;
};