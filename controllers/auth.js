const db = require('../models/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const key = process.env.JWT_ENCRYPT_KEY;

const login = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user, token;

    try {
        user = await db.User.findOne({ where: { username: username } });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                await db.User.update(
                    { last_logged_in: new Date() },
                    { where: { username: username } }
                );
                token = await signToken(user);
                return res.json({
                    status: true,
                    username: user.username,
                    token: token
                });
            } else {
                return res.json({
                    status: false,
                    errors: {
                        msg: 'password is not correct'
                    }
                });
            }
        } else {
            return res.json({
                status: false,
                errors: {
                    msg: 'username is not exist'
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const register = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // let identity = req.body.identity;

    try {
        if (!await db.User.findOne({ where: { username: username } })) {
            let user = {
                username: username,
                password: await bcrypt.hash(password, 10),
                group_id: 2,                                    //determine group_id by identity
            };

            if (await db.User.create(user)) {
                return res.json({
                    status: true
                });
            } else {
                return res.json({
                    status: false,
                    errors: {
                        msg: 'user creates failed, please try again'
                    }
                });
            }
        } else {
            return res.json({
                status: false,
                errors: {
                    msg: 'user has already existed'
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const resetPassword = async (req, res) => {
    let userId = req.authData.id;
    let newPassword = req.body.password;

    try {
        if (userId) {
            if (newPassword) {
                await db.User.update(
                    { password: await bcrypt.hash(newPassword, 10) },
                    { where: { id: userId } }
                );
                return res.json({
                    status: true,
                });
            } else {
                return res.json({
                    status: false,
                    errors: {
                        msg: 'required new password'
                    }
                });
            }
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const signToken = (user) => {
    return new Promise((resolve, reject) => {
        let payload = {
            id: user.id,
            permission: user.group_id
        };
        jwt.sign(payload, key, { expiresIn: '1h' }, (err, token) => {
            !err ? resolve(token) : reject(err);
        });
    });
};

module.exports = {
    login,
    register,
    resetPassword
};