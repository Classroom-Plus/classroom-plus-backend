module.exports = (sequelize, DataTypes) => {
    let Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        course_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_banner: {
            type: DataTypes.STRING,
        },
        course_info: {
            type: DataTypes.JSON,
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