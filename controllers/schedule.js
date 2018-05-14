const db = require('../models');

const getSchedule = async (req, res) => {
    let userId = req.authData.id;
    let courseList, courseAllEventList, courseEventList;
    let scheduleList, userScheduleList;
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

        scheduleList = await db.UserSchedule.findAll({
            attributes: [
                'id',
                'event_date',
                'event_title',
                'event_info'
            ],
            where: { user_id: userId },
            raw: true
        });

        userScheduleList = courseEventList.concat(scheduleList);

        return res.json({
            status: true,
            data: userScheduleList
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
    let { eventDate, eventTitle, eventInfo } = req.body;
    let schedule;

    if (!eventDate || !eventTitle) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    }

    try {
        schedule = await db.UserSchedule.create({
            user_id: userId,
            event_date: eventDate,
            event_title: eventTitle,
            event_info: eventInfo
        });

        if (schedule) {
            return res.json({
                status: true
            });
        }

        return res.json({
            status: false,
            errors: { msg: `errors` }
        })

    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: `database error` }
        });
    }
}

const updateSchedule = async (req, res) => {
    let { eventDate, eventTitle, eventInfo } = req.body;
    let userId = req.authData.id;
    let scheduleId = req.params.scheduleId;
    let schedule;

    if (!eventDate && !eventTitle && !eventInfo) {
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters, required at least a parameter' }
        });
    }

    let updateData = Object.assign({},
        (eventDate) ? { event_date: eventDate } : {},
        (eventTitle) ? { event_title: eventTitle } : {},
        (eventInfo) ? { event_info: eventInfo } : {}
    );

    try {
        schedule = db.UserSchedule.update(
            updateData,
            { where: { id: scheduleId } }
        )

        if (schedule[0]) {
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