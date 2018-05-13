const router = require('express').Router();
const auth =require('../middlewares/authenticate');
const controller =require('../controllers/message');
const upload =require('../utils/upload');
router 
    .route('/courseId/:courseId/topicId/:topicId')
    .post(auth.verifyToken,auth.verifyCourseMember,controller.addMessage)
    .get(auth.verifyToken,auth.verifyCourseMember,controller.getMessages);

router
    .route('/courseId/:courseId/topicId/:topicId/messageId/:messageId')
    .post(auth.verifyToken,auth.verifyCourseMember,controller.addUesrMessage)
    .get(auth.verifyToken,auth.verifyCourseMember,controller.getMessage)
    .delete(auth.verifyToken,auth.verifyCourseMember,controller.delMessage)
    .put(auth.verifyToken,auth.verifyCourseMember,controller.alertMessage);

module.exports=router;