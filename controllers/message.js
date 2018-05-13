const db =require('../models/');
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
const addMessage= async (req,res)=>{
    let userId=req.authData.id;
    let {courseId,topicId}=req.params;
    let {topicMessage}=req.body;
    let content={};
    if(!userId||!topicId||!topicMessage)
        return res.json({
            status:false,
            errors: { msg: 'incorrect parameters' }
        });
    content.content=topicMessage;
    if(req.files){
        content.files = new Array();
        let filename;
        for(let i=0;i<req.files.length;i++){
            if(checkType(/jpeg|jpg|png|gif/,req.files[i])){
                 filename = `/public/images/${req.files[i].filename}`;
            }else {
                 filename = `/public/files/${req.files[i].filename}`;
            }
            content.files.push(filename);
        }
    }
    try {
        if(await db.Topic.findOne({where:{id:topicId}})){
            if(await db.TopicMessage.create({
                topic_id:topicId,
                created_user_id:userId,
                topic_message:content

            })){
                return res.json({
                    status:true
                })
            }else 
                return res.json({
                    status:false,
                    errors:{msg:'cant add this message'}
                })
        }else {
            return res.json({
                status:false,
                errors:{mes:'this topic is dont exist.'}
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}

const addUesrMessage =async (req,res)=>{
    let userId=req.authData.id;
    let {courseId,topicId,messageId}=req.params;
    let {topicMessage}=req.body;
    let content={};
    if(!userId||!courseId||!topicId||!topicMessage||!messageId)
        return res.json({
            status:false,
            errors: { msg: 'incorrect parameters' }
        });
    if(req.files){
        content.files = new Array();
        let filename
        for(let i=0;i<req.files.length;i++){
            if(checkType(/jpeg|jpg|png|gif/,req.files[i])){
                 filename = `/public/images/${req.files[i].filename}`;
            }else {
                 filename = `/public/files/${req.files[i].filename}`;
            }
            content.files.push(filename);
        }
    }
    content.content=topicMessage;
    try {
        if(await db.TopicMessage.findOne({where:{
            id:messageId
        }})){
            if(await db.TopicMessage.create({
                topic_id:topicId,
                created_user_id:userId,
                ref_uuid:messageId,
                topic_message:content
            })){
                return res.json({
                    status:true
                })
            }else 
                return res.json({
                    status:false,
                    errors:{msg:'add message is failed.'}
                })
        }else {
            return res.json({
                status:false,
                errors:{mes:'this Message is dont exist.'}
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const alertMessage= async (req,res)=>{
    let userId =req.authData.id;
    let {messageId}= req.params;
    let {topicMessage} =req.body ;
    if(!userId||!topicMessage)
        return res.json({
            status:false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        let message = await db.TopicMessage.findOne({where:{created_user_id:userId,id:messageId}});
        if(message){
            let content = message.get('topic_message');
            content.content =topicMessage;
            if(await db.TopicMessage.update({topic_message:content},{where:{id:messageId}}))
                return res.json({
                    status:true
                });
            else 
                return res.json({
                    status:false,
                    errors:{
                        msg:'alert this message is failed'
                    }
                })
        }else {
            return res.json({
                status:false,
                error:{
                    msg:'message is dont exist or you have no permission'
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const delMessage= async(req,res)=>{
    let userId=req.authData.id;
    let {topicId,messageId}=req.params;
    if(!userId||!topicId||!messageId)
        return res.json({
            status:false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        if(await db.TopicMessage.findOne({
            where:{
                id:messageId,
                topic_id:topicId,
                created_user_id:userId,
            }
        })){
            if(await db.TopicMessage.destroy({
                where:{
                    id:messageId,
                    topic_id:topicId,
                    created_user_id:userId,
                }
            }))return res.json({
                status:true
            });
            else 
                return res.json({
                    status:false,
                    errors:{msg:'delete message is failed'}
                })
        }else {
            return res.json({
                status:false,
                error:{
                    msg:'message is dont exist or you have no permission'
                }
            })
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const getMessages = async (req,res)=>{
    let {topicId}=req.params;
    console.log(topicId);
    if(!topicId) 
        return res.json({
            status:false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        let messages= await db.TopicMessage.findAll({where:{topic_id:topicId,deleted_at:null}});
        if(messages){
            messages.map((element)=>{
                if('files' in element.topic_message )
                    element.topic_message.files[0]=`${process.env.BACKEND_SERVER_URL}${element.topic_message.files[0]}`
            })
        }
        return res.json(messages);
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const getMessage =async (req,res)=>{
    let {topicId,messageId}=req.params;
    if(!topicId||!messageId)
        return res.json({
            status:false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        let messages= await db.TopicMessage.findAll({where:{id:messageId,deleted_at:null}});
        if(messages){
            messages.map((element)=>{
                if('files' in element.topic_message )
                    element.topic_message.files[0]=`${process.env.BACKEND_SERVER_URL}${element.topic_message.files[0]}`
            })
        }
        return res.json(messages);
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
module.exports={
    addMessage,
    addUesrMessage,
    delMessage,
    getMessages,
    getMessage,
    alertMessage
}