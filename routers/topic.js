const router = require('express').Router(),
    controller = require('../controllers/topic'),
    auth = require('../middlewares/authenticate'),
    upload=require('../utils/uploader');
router
    .route('/course/:courseId')
    .post(auth.verifyToken,auth.verifyCourseMember,upload.uploadImage.any(),controller.addTopic)
    .get(auth.verifyToken,auth.verifyCourseMember,controller.getTopics);

router
    .route('/course/:courseId/topic/:topicId')
    .delete(auth.verifyToken,auth.verifyCourseMember,controller.deleteTopic)
    .get(auth.verifyToken,auth.verifyCourseMember,controller.getTopic)
    .put(auth.verifyToken,auth.verifyCourseMember,controller.alterTopic);

module.exports = router;