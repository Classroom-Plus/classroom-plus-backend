module.exports = (sequelize, DataTypes) => {
    let CourseMaterial = sequelize.define('CourseMaterial', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        course_id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
            unique: true
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'Course_Material',
        });

    CourseMaterial.associate = (models) => {
        models.CourseMaterial.belongsTo(models.Course, {
            foreignKey: 'course_id'
        });
    };

    return CourseMaterial;
}