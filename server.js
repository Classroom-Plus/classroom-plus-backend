const database = require('./utils/database');
const User = require('./models/user');

const addUser = async () => {

    try {
        await database.connect();

        //let result = await User.create({username: 'leon1757tw', password: '123456', email: 'leon1757tw', age: 20});
        //console.log(result);
        //let user = await User.findOne({username: 'leon76248tw'})
        //await user.save();
        //user.toJSON();
        //console.log(user);

        let test = await User.where({username: 'leon76248tw'}).update({username: 'leon76248tw', email: 'ccu.edu.tw'});
        console.log(test);
    } catch (error) {
        console.log(error);
    }
}

addUser();

