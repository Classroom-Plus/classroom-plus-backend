module.exports = (sequelize, DataTypes) => {
    let CourseEvent = sequelize.define('CourseEvent', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        course_id: {
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
            tableName: 'Course_Event',
        });

    CourseEvent.associate = (models) => {
        models.CourseEvent.belongsTo(models.Course, {
            foreignKey: 'course_id'
        });
    }

    return CourseEvent;
};