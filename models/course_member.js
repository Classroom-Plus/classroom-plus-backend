module.exports = (sequelize, DataTypes) => {
    let CourseMember = sequelize.define('CourseMember', {
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
        course_member_id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
            unique: true
        },
        course_member_identity: {
           type: DataTypes.INTEGER.UNSIGNED,
           allowNull: false,
           defaultValue: 0
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'Course_Member',
        });

    CourseMember.associate = (models) => {
        models.CourseMember.belongsTo(models.Course, {
            foreignKey: 'course_id'
        });
        models.CourseMember.belongsTo(models.User, {
            foreignKey: 'course_member_id'
        });
    }

    return CourseMember;
};