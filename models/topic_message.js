module.exports = (sequelize, DataTypes) => {
    let TopicMessage = sequelize.define('TopicMessage', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        topic_id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
        },
        created_user_id: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
        },
        ref_uuid: {
            type: DataTypes.STRING(36).BINARY,
        },
        topic_message: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'Topic_Message',
        });

    TopicMessage.associate = (models) => {
        models.TopicMessage.belongsTo(models.Topic, {
            foreignKey: 'topic_id'
        });
        models.TopicMessage.belongsTo(models.User, {
            foreignKey: 'created_user_id'
        });
    };

    return TopicMessage;
}