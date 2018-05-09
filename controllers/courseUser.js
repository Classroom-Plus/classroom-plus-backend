const db = require('../models');

const getUserList = async (req, res) => {
    let courseId = req.params.courseId;
    let memberList;

    try {
        memberList = await db.User.findAll({
            attributes: [
                'username'
            ],
            include: [{
                model: db.CourseMember,
                as: 'CourseMember',
                attributes: [],
                where: { course_id: courseId }
            }],
            raw: true
        });
        if (memberList) {
            return res.json({
                status: true,
                data: memberList
            });
        }

        return res.json({
            status: false,
            errors: { msg: `failed to get user list for course` }
        });

    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

const addUser = async (req, res) => {
    let courseId = req.params.courseId;

    try {

    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

const deleteUser = (req, res) => {
    let courseId = req.params.courseId;

    try {

    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

module.exports = {
    getUserList,
    addUser,
    deleteUser
};