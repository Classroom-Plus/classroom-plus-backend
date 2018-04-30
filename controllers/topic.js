const db = require('../models/');

const addTopic = async (req, res) => {
    let { topic_type, topic_content, topic_title } = req.body;
    let {courseId,userId} = req.params;
    if (!courseId || !userId || !topic_type || !topic_content || !topic_title)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });

    try {
        if (await db.Course.findOne({ where: { id: courseId } })) {
            await db.Topic.create({
                course_id: courseId,
                created_user_id: userId,
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
   let {courseId,topic_id,userId}=req.params;
   if(!courseId||!topic_id||!userId)
    return res.json({
        status:false,
        errors:{msg:'incorrect parameters'}
    })
    try {
        if(db.Topic.destroy({where:{created_user_id:userId,topic_id:topic_id}}))
            return res.json({
                status:true
            })
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const alterTopic = async (req, res) => {
    let { courseId, userId,topic_id } = req.params;
    let { topic_title, topic_content, topic_type } = req.body;
    if (!courseId || !userId || !topic_title || !topic_content || !topic_type||!topic_id)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        let topic = await db.Topic.findOne({ where: { course_id: courseId, created_user_id: userId,id:topic_id } });
        if (topic) {
            if (await db.Topic.update(
                { topic_content: topic_content, topic_title, topic_title, topic_type: topic_type,updated_at:new Date() },
                { where: { course_id: courseId, created_user_id: userId,id:topic_id } })) {
                    return res.json({
                        status:true,
                    })
            }else{
                return res.json({
                    status:false,
                    errors:{msg:'can\'t alter this topic'}
                })
            }
        } else {
            return res.json({
                status: false,
                errors: { msg: 'can\'t find this topic.' }
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const getTopic = async (req, res) => {
    let { courseId } = req.params;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        await db.Topic.findAll({ where: { course_id: courseId } }).then(topics => res.json(topics));
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