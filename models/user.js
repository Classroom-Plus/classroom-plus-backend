module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        privilege: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        last_logged_in: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'User',
        });

    User.associate = (models) => {
        models.User.hasOne(models.UserInfo, {
            foreignKey: 'user_id'
        });
        models.User.hasOne(models.UserSchedule, {
            foreignKey: 'user_id'
        });
        models.User.hasOne(models.CourseMember, {
            foreignKey: 'course_member_id'
        });
        models.User.hasOne(models.Topic, {
            foreignKey: 'created_user_id'
        });
    }

    return User;
};