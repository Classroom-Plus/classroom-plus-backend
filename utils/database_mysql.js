const Sequelize = require('sequelize');
const sequelize = new Sequelize('classroom_plus_db', 'classroom_plus', '123456', {
    host: '107.167.190.255',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
    },
});

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
    },
    createAtTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    firstname: {
        type: Sequelize.STRING,
        field: 'first_name',
        validate: {
            len: {
                args: [2, 10],
                msg: "length of firstname is not allowed"
            }
        },
        get: function () {
            return this.getDataValue('firstname').toUpperCase();
        },
    },
    lastname: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
}, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            fullName: function () { return this.firstname + ' ' + this.lastname }
        },
        setterMethods: {
            fullName: function (value) {
                var names = value.split(' ');
                this.setDataValue('firstname', names.slice(0, -1).join(' '));
                this.setDataValue('lastname', names.slice(-1).join(' '));
            },
        }
    });

const test = async () => {
    //try {
        await User.sync({ force: false });
        let user = await User.create({ account: 'test2', password: 'test1', firstname: 'cheng', lastname: 'yj' });
        console.log(user.get('firstname')); //全大寫
        console.log(user.get('fullName'));  //可以看到 firstname也是大寫顯示
        user.set('fullName', 'hello world'); //改名
        console.log(user.get('fullName'));
        user.save(); //儲存回DB
    //} catch (error) {
        console.log('==========================================');
        //console.log(error);
        console.log('==========================================');
        
    //}
}

test();
/*
User.sync({ force: true })
    .then(() => {
        return User.create({ account: 'test1', password: 'test1', firstname: 'cheng', lastname: 'yj' });
    }).then((user) => {
        console.log(user.get('firstname')); //全大寫
        console.log(user.get('fullName'));  //可以看到 firstname也是大寫顯示
        user.set('fullName', 'hello world'); //改名
        console.log(user.get('fullName'));
        user.save(); //儲存回DB
    }).catch((err) => {
        console.log(err);
    });
*/