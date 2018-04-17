const db = require('../models');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const secretKey = process.env.JWT_ENCRYPT_KEY;

const verifyToken = (req, res, next) => {
    const bearerHeader = req.header("Authorization");
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            } else {
                req.authData = decoded;
                next();
            }
        });
    } else {
        return res.sendStatus(403);
    }
};

const verifyCourseMember = async (req, res, next) => {
    let userId = req.authData.id;
    let courseId = req.params.courseId;
    let isCourseMember;

    if (userId && courseId) {
        isCourseMember = await db.CourseMember.findOne({
            where: {
                course_id: courseId,
                course_member_id: userId
            },
            raw: true
        });
        if (isCourseMember) {
            next();
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
}; 

module.exports = {
    verifyToken,
    verifyCourseMember
};
