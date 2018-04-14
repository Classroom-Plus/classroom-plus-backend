const db = require('../models/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const key = process.env.JWT_ENCRYPT_KEY;

const login = async (req, res) => {
    let user, token;

    try {
        user = await db.User.findOne({ where: { username: req.body.username } });
        if (user !== null) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                await db.User.update(
                    { last_logged_in: new Date() },
                    { where: { username: req.body.username } }
                );
                token = await signToken(user);
                res.json({
                    status: true,
                    username: user.username,
                    token: token
                });
            } else {
                res.json({
                    status: false,
                    errors: {
                        msg: 'password is not correct'
                    }
                });
            }
        } else {
            res.json({
                status: false,
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
                group_id: 2,
            };

            if (await db.User.create(user)) {
                res.json({
                    status: 'success'
                });
            } else {
                res.json({
                    status: false,
                    errors: {
                        msg: 'user create failed, please try again'
                    }
                });
            }
        } else {
            res.json({
                status: false,
                errors: {
                    msg: 'user has already existed'
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const signToken = (user) => {
    return new Promise((resolve, reject) => {
        let payload = {
            id: user.id,
            permission: user.group_id
        };
        jwt.sign(payload, key, (err, token) => {
            !err ? resolve(token) : reject(err);
        });
    });
};

module.exports = {
    login,
    register
};