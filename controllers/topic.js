const db = require('../models/');
const path =require('path');
const checkType = (types, file) => {
    const filetypes = types;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return true 
    } else {
        return false
    }
};
const addTopic = async (req, res) => {
    let userId = req.authData.id;
    let courseId = req.params.courseId;
    let { topicType, topicTitle, topicContent } = req.body;
    let content = {};
    content.topicContent = topicContent;
    if (!userId || !courseId || !topicType || !topicContent || !topicTitle)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        })
    if(req.files){
        content.files = new Array();
        let filename;
        for(let i=0;i<req.files.length;i++){
            if(checkType(/jpeg|jpg|png|gif/,req.files[i])){
                 filename = `public/images/${req.files[i].filename}`;
            }else {
                 filename = `public/files/${req.files[i].filename}`;
            }
            content.files.push(filename);
        }
    }
    try {
        if (await db.Course.findOne({ where: { id: courseId } })) {
            if (topicType === 'announce') {
                if(!req.body.eventDate) 
                    return res.json({
                        status: false,
                        errors: { msg: 'incorrect parameters' }
                    })
                let eventDate = new Date(req.body.eventDate);
                let course = await db.CourseMember.findOne({ where: { course_id: courseId, course_member_id: userId } });
                if (course) {
                    if (course.get('course_member_identity') === 1) {
                        if (await db.CourseEvent.create({
                            course_id: courseId,
                            event_date: eventDate,
                            event_title: topicTitle,
                            event_info: content
                        })) res.json({
                            status: true
                        }); else {
                            return res.json({
                                status: false,
                                errors: { msg: 'create announce is fail' }
                            })
                        }
                    } else {
                        return res.sendStatus(401);
                    }
                }
            } else {
                if (await db.Topic.create({
                    course_id: courseId,
                    created_user_id: userId,
                    topic_type: topicType,
                    topic_title: topicTitle,
                    topic_content: content
                })) {
                    return res.json({
                        status: true
                    })
                } else {
                    return res.json({
                        status: false,
                        errors: { msg: 'create topic is fail' }
                    })
                }
            }
        } else {
            res.json({
                status: false,
                errors: { msg: 'this course dont exist' }
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}

const deleteTopic = async (req, res) => {
    let userId = req.authData.id;
    let { courseId, topicId } = req.params;
    if (!userId || !courseId || !topicId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        if (await db.Topic.destroy({ where: { created_user_id: userId, course_id: courseId, id: topicId } })) {
            return res.json({
                status: true
            })
        } else {
            return res.json({
                status: false,
                errors: { msg: 'delete this topic is fail' }
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const deleteAnnounce = async (req, res) => {
    let userId = req.authData.id;
    let { courseId, eventId } = req.params;
    if (!userId || !courseId || !eventId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        let course = await db.CourseMember.findOne({ where: { course_id: courseId, course_member_id: userId } });
        if (course) {
            if (course.get('course_member_identity') === 1) {
                if (await db.CourseEvent.destroy({ where: { course_id: courseId, id: eventId } })) {
                    res.json({
                        status: true
                    })
                } else {
                    return res.json({
                        status: false,
                        errors: { msg: 'destroy announce is failed' }
                    })
                }
            } else {
                return res.sendStatus(401);
            }
        } else {
            res.json({
                status: false,
                errors: { msg: 'this announce dont exist' }
            })
        }

    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const alterAnnounce = async (req, res) => {
    let { courseId, eventId } = req.params;
    let userId = req.authData.id;
    let { topicTitle, topicContent, topicType, eventDate } = req.body;
    let content = {};
    if (!courseId || !userId || !topicTitle || !topicContent || !topicType || !eventId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    if(topicType!=='announce')
        return res.json({
            status:false,
            errors:{msg:'type error'}
        })
    try {
        let course = await db.CourseMember.findOne({ where: { course_id: courseId, course_member_id: userId } });
        if (course) {
            if (course.get('course_member_identity') === 1) {
                let event = await db.CourseEvent.findOne({ where: { id: eventId } });
                content = event.get('event_info');
                content.topicContent = topicContent;
                if (await db.CourseEvent.update({
                    event_title: topicTitle,
                    event_info: content,
                    event_date: new Date(eventDate)
                }, { where: { course_id: courseId, id: eventId } })) {
                    return res.json({
                        status: true
                    })
                } else {
                    res.json({
                        status: false,
                        errors: { msg: 'update event is fail' }
                    })
                }
            } else {
                return res.sendStatus(401);
            }
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const alterTopic = async (req, res) => {
    let { courseId, topicId } = req.params;
    let userId = req.authData.id;
    let { topicTitle, topicContent, topicType ,eventDate} = req.body;
    let topic, content = {};
    if (!courseId || !userId || !topicTitle || !topicContent || !topicType || !topicId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        topic = await db.Topic.findOne({ where: { course_id: courseId, created_user_id: userId, id: topicId } });
        if (topic) {
            content = topic.get('topic_content');
            content.topicContent = topicContent;
            if (await db.Topic.update({
                topic_title: topicTitle,
                topic_type: topicType,
                topic_content: content
            }, { where: { course_id: courseId, created_user_id: userId, id: topicId } })) {
                res.json({
                    status: true
                })
            } else {
                res.json({
                    status: false,
                    errors: { msg: 'update topic is fail' }
                })
            }
        } else {
            res.json({
                status: false,
                errors: { msg: 'this topic don\'t exist.' }
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}


const getTopics = async (req, res) => {
    let { courseId } = req.params;
    let topics, event, all = {};
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        topics = await db.Topic.findAll({
            attributes: [
                'id',
                'course_id',
                'created_user_id',
                'topic_type',
                'topic_title',
                'topic_content',
                'created_at'
            ]
        }, { where: { course_id: courseId, deleted_at: null } });
        event = await db.CourseEvent.findAll({
            attributes: [
                'id',
                'course_id',
                'event_date',
                'event_title',
                'event_info',
                'created_at'
            ]
        }, { where: { course_id: courseId, deleted_at: null } });
        if (event.length > 0)
            event.map((element) => {
                if ('files' in element.event_info)
                    for (let i = 0; i < element.event_info.files.length; i++)
                        element.event_info.files[i] = `${process.env.BACKEND_SERVER_URL}/${element.event_info.files[i]}`;
            });
        if (topics.length > 0)
            topics.map((element) => {
                if ('files' in element.topic_content)
                    for (let i = 0; i < element.topic_content.files.length; i++)
                        element.topic_content.files[i] = `${process.env.BACKEND_SERVER_URL}/${element.topic_content.files[i]}`;
            });
        all.topic = topics;
        all.announce = event;
        return res.json(all);
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const getTopic = async (req, res) => {
    let { courseId, topicId } = req.params;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        await db.Topic.findOne({ where: { course_id: courseId, deleted_at: null, id: topicId } }).then(topic => res.json(topic));
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}
const getAnnounce = async (req, res) => {
    let { courseId, eventId } = req.params;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        await db.CourseEvent.findOne({ where: { course_id: courseId, deleted_at: null, id: eventId } }).then(announce => res.json(announce));
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
module.exports = {
    addTopic,
    deleteTopic,
    deleteAnnounce,
    alterAnnounce,
    alterTopic,
    getTopics,
    getTopic,
    getAnnounce
}