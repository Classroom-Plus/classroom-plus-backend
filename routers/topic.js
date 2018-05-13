const router = require('express').Router(),
    controller = require('../controllers/topic'),
    auth = require('../middlewares/authenticate'),
    upload = require('../utils/upload');
router
    .route('/course/:courseId')
    .post(auth.verifyToken, auth.verifyCourseMember,upload.uploadMessage.any() ,controller.addTopic)
    .get(auth.verifyToken, auth.verifyCourseMember, controller.getTopics);

router
    .route('/course/:courseId/topic/:topicId')
    .delete(auth.verifyToken, auth.verifyCourseMember, controller.deleteTopic)
    .get(auth.verifyToken, auth.verifyCourseMember, controller.getTopic)
    .put(auth.verifyToken, auth.verifyCourseMember, controller.alterTopic);

router
    .route('/course/:courseId/announce/:eventId')
    .delete(auth.verifyToken, auth.verifyCourseMember, controller.deleteAnnounce)
    .get(auth.verifyToken, auth.verifyCourseMember, controller.getAnnounce)
    .put(auth.verifyToken, auth.verifyCourseMember, controller.alterAnnounce);

module.exports = router;