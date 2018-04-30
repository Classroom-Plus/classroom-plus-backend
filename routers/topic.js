const router = require('express').Router(),
    controller = require('../controllers/topic'),
    authenticate = require('../middlewares/authenticate');

router
    .route('/course/:courseId/user/:userId')
    .post(controller.addTopic);
router
    .route('/course/:courseId/user/:userId/topic/:topic_id')
    .put(controller.alterTopic)
    .delete(controller.deleteTopic);
router
    .route('/course/:courseId')
    .get(controller.getTopic);

module.exports = router;