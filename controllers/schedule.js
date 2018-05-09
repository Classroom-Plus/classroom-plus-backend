const db = require('../models');

const getSchedule = async (req, res) => {
    let userId = /*req.authData.id*/8;
    let courseList, courseAllEventList, courseEventList;
    let hasCourse;

    try {
        courseList = await db.CourseMember.findAll({
            attributes: [
                'course_id'
            ],
            where: { course_member_id: userId },
            raw: true
        });

        courseAllEventList = await db.CourseEvent.findAll({
            attributes: [
                'course_id',
                'event_date',
                'event_title',
                'event_info'
            ],
            raw: true
        });

        courseEventList = courseAllEventList.filter((event) => {
            hasCourse = false;
            courseList.forEach(element => {
                if (element.course_id === event.course_id) {
                    hasCourse = true;
                }
            });
            return hasCourse;
        });

        return res.json({
            status: true,
            data: courseEventList
        });

    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
};

const createSchedule = async (req, res) => {
    let userId = req.authData.id;

}

const updateSchedule = async (req, res) => {
    let userId = req.authData.id;

}

const deleteSchedule = async (req, res) => {
    let userId = req.authData.id;
}

module.exports = {
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
};