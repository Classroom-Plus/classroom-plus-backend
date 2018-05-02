const db = require('../models');

const getUserInfo = async (req, res) => {
    let userId = req.authData.id;
    let user;

    try {
        user = await db.UserInfo.findOne({
            attributes: [
                'user_id',
                'email',
                'first_name',
                'last_name'
            ],
            where: {
                user_id: userId
            },
            raw: true
        });
        if (user) {
            return res.json({
                status: true,
                data: user
            });
        }
        return res.json({
            status: false,
            errors: { msg: `user not found` }
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

const updateUserInfo = async (req, res) => {
    let { email, firstName, lastName } = req.body;
    let userId = req.authData.id;
    let user;

    if (!email && !firstName && !lastName) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters, required at least a parameter' }
        });
    }

    let updateData = Object.assign({},
        (email) ? { email: email } : {},
        (firstName) ? { first_name: firstName } : {},
        (lastName) ? { last_name: lastName } : {}
    );

    try {
        user = await db.UserInfo.update(
            updateData,
            { where: { user_id: userId } }
        );
        if (user[0]) {
            return res.json({
                status: true
            });
        }
        return res.json({
            status: false,
            errors: { msg: `updated failed` }
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

module.exports = {
    getUserInfo,
    updateUserInfo
};