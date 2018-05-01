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
            unique: false
        },
        material_directory: {
            type: DataTypes.STRING,
            defaultValue: '/'
        },
        material_filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material_convert: {
            type: DataTypes.STRING,
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