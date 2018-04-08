module.exports = (sequelize, DataTypes) => {
    let UserSchedule = sequelize.define('UserSchedule', {
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
        event_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        event_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_info: {
            type: DataTypes.JSON,
            get() {
                return JSON.parse(this.getDataValue('event_info'));
            },
            set(value) {
                this.setDataValue('event_info', JSON.stringify(value));
            }
        }       
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'User_Schedule',
        });

    UserSchedule.associate = (models) => {
        models.UserSchedule.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    }
    
    return UserSchedule;
};