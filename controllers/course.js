const fs = require('fs');
const path = require('path');
const env = require('dotenv').config();
const db = require('../models');
const { uploadImage } = require('../utils/uploader');

const getCourseList = async (req, res) => {
    let courseList;
    try {
        courseList = await db.Course.findAll({ raw: true });
        if (courseList) {
            courseList.map((entry) => {
                entry.course_banner = `${process.env.SERVER_IP}:${process.env.PORT}${entry.course_banner}`;
                delete entry.created_at;
                delete entry.updated_at;
                delete entry.deleted_at;
            });
            console.log(courseList);
            return res.json({
                status: true,
                data: courseList
            });
        }
        return res.json({
            status: false,
            errors: { msg: 'error' }
        });
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'error' }
        });
    }
};

// getCourseList();

const getUserCourseList = async (req, res) => {
    let userId = 1 || req.authData.id;
    let courseList;

    try {
        courseList = await db.Course.findAll(
            {
                attributes:[
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
                    where: {course_member_id: userId}
                }],
                raw: true
            });
        if(courseList.length > 0){
            console.log({
                status: true,
                data: courseList
            });
            // return res.json({
            //     status: true,
            //     data: courseList
            // })
        }
        // return res.json({
        //     status: false,
        //     errors: { msg: 'error' }
        // });
    } catch (error) {
        console.log(error);
        // return res.json({
        //     status: false,
        //     errors: { msg: 'error' }
        // });
    }
}

getUserCourseList();

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
    getCourseList,
    createCourse
}