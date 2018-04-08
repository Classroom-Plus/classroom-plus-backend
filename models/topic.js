module.exports = (sequelize, DataTypes) => {
    let Topic = sequelize.define('Topic', {
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
        created_user_id:{
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
            unique: true
        },
        topic_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        topic_content: {
            type: DataTypes.JSON,
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue('topic_content'));
            },
            set(value) {
                this.setDataValue('topic_content', JSON.stringify(value));
            }
        }
    }, {
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'Topic',
        });

    Topic.associate = (models) => {
        models.Topic.belongsTo(models.Course, {
            foreignKey: 'course_id'
        });
        models.Topic.belongsTo(models.User, {
            foreignKey: 'created_user_id'
        });
    };

    return Topic;
}