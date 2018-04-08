module.exports = (sequelize, DataTypes) => {
    let Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        course_info: {
            type: DataTypes.JSON,
            get() {
                return JSON.parse(this.getDataValue('course_info'));
            },
            set(value) {
                this.setDataValue('course_info', JSON.stringify(value));
            }
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'Course',
        });

    Course.associate = (models) => {
        models.Course.hasOne(models.CourseMember, {
            foreignKey: 'course_id'
        });
        models.Course.hasOne(models.CourseEvent, {
            foreignKey: 'course_id'
        });
        models.Course.hasOne(models.CourseMaterial, {
            foreignKey: 'course_id'
        });
        models.Course.hasOne(models.Topic, {
            foreignKey: 'course_id'
        });
    }

    return Course;
};