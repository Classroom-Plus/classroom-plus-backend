const database = require('../utils/database');
const User = require('../models/user');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    let data = req.body;
    let account;
    let token;

    try {
        await database.connect();
        if (account = await User.findOne({ username: data.username })) {
            if (await bcrypt.compare(data.password, account.password)) {
                token = await jwt.signToken({ username: account.username });
                return res.json({
                    login: true,
                    token: token
                });
            }
        }
        return res.json({
            errors: {
                msg: '帳號或密碼錯誤'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age
    };

    try {
        await database.connect();
        if (!await User.findOne({ username: data.username })) {
            data.password = await bcrypt.hash(data.password, 10)
            if (await User.create(data)) {
                console.log(data);
                res.send(data);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    login,
    register
};