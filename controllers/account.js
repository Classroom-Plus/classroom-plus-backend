const db = require('../models/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const key = process.env.JWT_ENCRYPT_KEY;

const signIn = async (req, res) => {
    let { username, password } = req.body;
    let user;

    if (!username && !password) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    }

    try {
        user = await db.User.findOne({ where: { username: username } });
        if (user) {
            if (await bcrypt.compare(password, user.get('password'))) {
                await db.User.update(
                    { last_logged_in: new Date() },
                    {
                        where: { username: username },
                        silent: true
                    }
                );
                return res.json({
                    status: true,
                    username: user.get('username'),
                    token: await signToken(user)
                });
            } else {
                return res.json({
                    status: false,
                    errors: { msg: 'password is not correct' }
                });
            }
        } else {
            return res.json({
                status: false,
                errors: { msg: 'username is not exist' }
            });
        }
    } catch (error) {
        return res.sendStatus(400);
    }
};

const signUp = async (req, res) => {
    let { username, password } = req.body;
    let groupName = req.body.groupName || 'user';

    if (!username && !password) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    }

    try {
        db.User.findOrCreate({
            where: {
                username: username
            },
            defaults: {
                username: username,
                password: await bcrypt.hash(password, 10),
                group_id: await db.Group.findOne({ where: { group_name: groupName } }).get('id')
            }
        }).spread(async (user, isCreate) => {
            if (isCreate) {
                isCreate = await db.UserInfo.create({
                    user_id: user.get('id')
                });
                if (isCreate) {
                    return res.json({
                        status: true
                    });
                }
            }
            return res.json({
                status: false,
                errors: { msg: 'user has already existed' }
            });
        });
    } catch (error) {
        return res.sendStatus(400);
    }
};


const resetPassword = async (req, res) => {
    let userId = req.authData.id;
    let newPassword = req.body.password;

    if (!userId) {
        return res.sendStatus(401);
    } else if (!newPassword) {
        return res.json({
            status: false,
            errors: { msg: 'required new password' }
        });
    }

    try {
        await db.User.update(
            { password: await bcrypt.hash(newPassword, 10) },
            { where: { id: userId } }
        );
        return res.json({
            status: true,
        });
    } catch (error) {
        return res.sendStatus(400);
    }
}

const signToken = (user) => {
    return new Promise((resolve, reject) => {
        let payload = {
            id: user.get('id'),
            permission: user.get('group_id')
        };
        jwt.sign(payload, key, { expiresIn: '1h' }, (err, token) => {
            !err ? resolve(token) : reject(err);
        });
    });
};

module.exports = {
    signIn,
    signUp,
    resetPassword
};