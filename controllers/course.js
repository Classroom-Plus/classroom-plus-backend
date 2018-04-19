const db = require('../models');
const express = require('express');
const app = express();

const getCourseList = async (req, res) => {
    let courseList;
    try {
        courseList = await db.Course.findAll({ raw: true });
        console.log(courseList);
    } catch (error) {
        console.log(error);
    }
};

const createCourse = async (req, res) => {
    let {courseName, courseInfo, courseBanner}

    try {
        await db.Course.create({
            course_info: req.body
        }, { raw: true });
        res.json({
            status: success
        });
    } catch (error) {
        res.json({
            status: failed,
            errors: {
                msg: 'created failed'
            }
        });
    }
};

const updateCourse = () => {

};

const deleteCourse = () => {

};
