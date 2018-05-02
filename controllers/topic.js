const db = require('../models/');

const addTopic = async (req, res) => {
    let userId=req.authData.id;
    let courseId=req.params.courseId;
    let {topicType,topicTitle,topicContent}=req.body;
    let content={};
    content.topicContent=topicContent;
    if(!userId||!courseId||!topicType||!topicContent||!topicTitle)
        return res.json({
            status:false,
            errors:{msg:'incorrect parameters'}
        })
    if(req.files){
          content.files=new Array();
          for(let i=0;i<req.files.length;i++)
            content.files.push(req.files[i].path);
    }
    try {
        if(await db.Course.findOne({where:{id:courseId,deleted_at:null}})){
            if(await db.Topic.create({
                course_id:courseId,
                created_user_id:userId,
                topic_type:topicType,
                topic_title:topicTitle,
                topic_content:content
            })){
                return res.json({
                    status:true
                })
            }else{
                return res.json({
                    status:false,
                    errors:{msg:'create topic is fail'}
                })
            }
        }else {
            return res.json({
                status:false,
                errors:{msg:'this course do\'t exist'}
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const deleteTopic = async (req, res) => {
   let userId =req.authData.id;
   let {courseId,topicId}=req.params;
   if(!userId||!courseId||!topicId)
    return res.json({
        status: false,
        errors: { msg: 'incorrect parameters' }
    }); 
    try {
        if(await db.Topic.destroy({where:{created_user_id:userId,course_id:courseId,id:topicId}})){
            return res.json({
                status:true
            })
        }else {
            return res.json({
                status:false,
                errors:{msg:'delete this topic is fail'}
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const alterTopic = async (req, res) => {
    let { courseId,topicId } = req.params;
    let userId =req.authData.id;
    let { topicTitle, topicContent, topicType } = req.body;
    let topic,content={};
    if (!courseId || !userId || !topicTitle || !topicContent || !topicType||!topicId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        topic = await db.Topic.findOne({ where: { course_id: courseId, created_user_id: userId,id:topicId } });
       if(topic){
            content =topic.get('topic_content');
            content.topicContent=topicContent;
            if(await db.Topic.update({
                topic_title:topicTitle,
                topic_type:topicType,
                topic_content:content
            },{ where: { course_id: courseId, created_user_id: userId,id:topicId } })){
                res.json({
                    status:true
                })
            }else {
                res.json({
                    status:false,
                    errors:{msg:'update topic is fail'}
                })
            }
        }else {
            res.json({
                status:false,
                errors:{msg:'this topic don\'t exist.'}
            })
        }
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

const getTopics = async (req, res) => {
    let { courseId } = req.params;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        await db.Topic.findAll({ where: { course_id: courseId ,deleted_at:null} }).then(topics => res.json(topics));
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}
const getTopic = async (req, res) => {
    let { courseId,topicId } = req.params;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        await db.Topic.findOne({ where: { course_id: courseId ,deleted_at:null,id:topicId} }).then(topic => res.json(topic));
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

module.exports = {
    addTopic,
    deleteTopic,
    alterTopic,
    getTopics,
    getTopic
}