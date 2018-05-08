const db =require('../models/');

const addMessage= async (req,res)=>{
    let userId=req.authData.Id;
    let {courseId,topicId}=req.params;
}