const env = require('dotenv').config();
const { uploadImage } = require('../utils/uploader');
const db = require('../models');

const getCourseList = async (req, res) => {
    let courseList;

    try {
        courseList = await db.Course.findAll({
            attributes: [
                'id',
                'course_type',
                'course_name',
                'course_banner',
                'course_info'
            ],
            raw: true
        });
        if (courseList.length > 0) {
            courseList.map((element) => {
                if (element.course_banner !== null) {
                    element.course_banner = `${process.env.SERVER_IP}:${process.env.PORT}${element.course_banner}`;
                }
            });
        }
        return res.json({
            status: true,
            data: courseList
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
};

const getUserCourseList = async (req, res) => {
    let userId = req.authData.id;
    let courseList;

    try {
        courseList = await db.Course.findAll({
            attributes: [
                'id',
                'course_type',
                'course_name',
                'course_banner',
                'course_info'
            ],
            include: [{
                model: db.CourseMember,
                as: 'CourseMember',
                attributes: [],
                where: { course_member_id: userId }
            }],
            raw: true
        });
        if (courseList.length > 0) {
            courseList.map((element) => {
                if (element.course_banner !== null) {
                    element.course_banner = `${process.env.SERVER_IP}:${process.env.PORT}${element.course_banner}`;
                }
            });
        }
        return res.json({
            status: true,
            data: courseList
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
};

const createCourse = async (req, res) => {
    let { courseType, courseName, courseInfo } = req.body;
    let courseBanner = (req.files[0] !== undefined) ? `/images/${req.files[0].filename}` : null;
    let course, courseMember;

    if (!courseType || !courseName) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    }

    try {
        course = await db.Course.create({
            course_type: courseType,
            course_name: courseName,
            course_banner: courseBanner,
            course_info: courseInfo
        });
        if (course) {
            courseMember = await db.CourseMember.create({
                course_id: course.get('id'),
                course_member_id: req.authData.id,
                course_member_identity: 1
            });
            if (courseMember) {
                return res.json({
                    status: true
                });
            }
        }
        return res.json({
            status: false,
            errors: { msg: 'created failed' }
        });

    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

const updateCourse = async (req, res) => {
    let { courseType, courseName, courseInfo } = req.body;
    let courseBanner = (req.files[0] !== undefined) ? `/images/${req.files[0].filename}` : undefined;
    let courseId = req.params.courseId;
    let course;

    if (!courseType && !courseName && !courseInfo) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters, required at least a parameter' }
        });
    }

    let updateData = Object.assign({},
        (courseType) ? { course_type: courseType } : {},
        (courseName) ? { course_name: courseName } : {},
        (courseInfo) ? { course_info: courseInfo } : {},
        (courseBanner) ? { course_banner: courseBanner } : {}
    );

    try {
        course = await db.Course.update(
            updateData,
            { where: { id: courseId } }
        );

        if (course[0]) {
            return res.json({
                status: true
            });
        }

        return res.json({
            status: false,
            errors: { msg: 'updated failed' }
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

const deleteCourse = async (req, res) => {
    let courseId = req.params.courseId;
    let isDelete;

    try {
        if (await db.Course.destroy({ where: { id: courseId } })) {
            if (await db.CourseMember.destroy({ where: { course_id: courseId } })) {
                return res.json({
                    status: true
                });
            }
        }
        return res.json({
            status: false,
            errors: { msg: `Id isn't exist or has been delete` }
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
};

module.exports = {
    getCourseList,
    getUserCourseList,
    createCourse,
    updateCourse,
    deleteCourse,
}