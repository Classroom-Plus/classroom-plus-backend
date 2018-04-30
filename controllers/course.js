const fs = require('fs');
const path = require('path');
const db = require('../models');
const { uploadImage } = require('../utils/uploader');

const getCourseList = async (req, res) => {
    let courseList;
    try {
        courseList = await db.Course.findAll({ raw: true });
        courseList.map((element) => {
            element.course_banner = `localhost:8080${element.course_banner}`;
        });
        courseList.forEach((element) => {
            console.log(element.course_banner);
        });
    } catch (error) {
        console.log(error);
    }
};

const getUserCourseList = async (req, res) => {
    let userId = req.authData.id;
    let courseList;

}

const createCourse = async (req, res) => {
    let { courseType, courseName, courseInfo } = req.body;
    let course, courseMember;

    try {
        course = await db.Course.create({
            course_type: courseType,
            course_name: courseName,
            course_banner: `/images/${req.files[0].filename}`,
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
            errors: { msg: 'created error' }
        });
    }
};

const updateCourse = () => {

};

const deleteCourse = () => {

};


module.exports = {
    createCourse,
}