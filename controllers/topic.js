const db = require('../models/');

const addTopic = async (req, res) => {
    let { topic_type, topic_content, topic_title } = req.body;
    let course_id = req.params.course_id;
    let created_user_id = req.params.created_user_id;
    if (!course_id || !created_user_id || !topic_type || !topic_content || !topic_title)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });

    try {
        if (await db.Course.findOne({ where: { id: course_id } })) {
            await db.Topic.create({
                course_id: course_id,
                created_user_id: created_user_id,
                topic_type: topic_type,
                topic_title: topic_title,
                topic_content: topic_content
            }).spread((course, isCreate) => {
                if (isCreate)
                    return res.json({
                        status: true,
                    });
                else
                    return res.json({
                        status: false,
                        errors: { msg: 'Creating topic is fail' }
                    })
            })
        } else {
            return res.json({
                status: false,
                errors: { msg: 'this course_id don\'t exist' }
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const deleteTopic = async (req, res) => {
    let topic_id = req.params.topic_id,
        created_user_id = req.params.created_user_id;
    if (!topic_id)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        if (await db.Topic.findOne({ where: { id: topic_id, created_user_id: created_user_id } })) {
            db.Topic.destory({ where: { id: topic_id, created_user_id: created_user_id } });
            return res.json({
                status: true
            });
        } else {
            return res.json({
                status: false,
                errors: { msg: 'this topic don\'t exist' }
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const alterTopic = async (req, res) => {
    let topic_id = req.params.topic_id,
        created_user_id = req.params.created_user_id;
    let { topic_content, topic_type, topic_title } = req.body;
    if (!topic_id || !topic_content || !topic_type || !topic_title)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        if (await db.Topic.findOne({ where: { id: topic_id, created_user_id: created_user_id } })) {
            db.Topic.update({
                where: { id: topic_id, created_user_id: created_user_id }
            }, {
                    topic_content: topic_content,
                    topic_type: topic_type,
                    topic_title: topic_title,
                    update_at: new Data()
                })
            return res.json({
                status: true
            })
        } else {
            return res.json({
                status: false,
                errors: { msg: 'this topic don\'t exist' }
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const getTopic = async (req, res) => {
    let { course_id } = req.params;
    if (!course_id)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        await db.Topic.findAll({ where: { course_id: course_id } }).then(topics => res.json(topics));
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

module.exports = {
    addTopic,
    deleteTopic,
    alterTopic,
    getTopic
}