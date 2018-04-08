const db = require('../models/');
const jwt = require('../utils/jwt');

const bcrypt = require('bcrypt');

const login = async (req, res) => {
    let user;

    try {
        if (user = await db.User.findOne({ where: { username: req.body.username } })) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                await db.User.update(
                    { last_logged_in: new Date() },
                    { where: { username: req.body.username } });
                res.json({
                    status: 'success',
                    token: await jwt.signToken({ username: user.username })
                });
            } else {
                res.json({
                    status: 'failed',
                    errors: {
                        msg: 'password is not correct'
                    }
                });
            }
        } else {
            res.json({
                status: 'failed',
                errors: {
                    msg: 'username is not exist'
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        if (!await db.User.findOne({ where: { username: req.body.username } })) {
            let user = {
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                privilege: 5,
            };

            if (await db.User.create(user)) {
                res.json({
                    status: 'success'
                });
            } else {
                res.json({
                    status: 'failed',
                    errors: {
                        msg: 'user create failed, please try again'
                    }
                });
            }
        } else {
            res.json({
                status: 'failed',
                errors: {
                    msg: 'user has already existed'
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    login,
    register
};