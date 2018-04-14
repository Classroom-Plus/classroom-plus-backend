module.exports = (sequelize, DataTypes) => {
    let Group = sequelize.define('Group', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'Group',
        });

    Group.associate = (models) => {
        models.Group.hasOne(models.User, {
            foreignKey: 'group_id'
        });
    }

    return Group;
};