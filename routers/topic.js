const router = require('express').Router(),
    controller = require('../controllers/topic'),
    authenticate = require('../middlewares/authenticate');

router
    .route('/:course_id/:created_user_id')
    .post(controller.addTopic)
router 
    .route('/:course_id')
    .get(controller.getTopic)
router
    .route('/:course_id/:topic_id/:created_user_id')
    .delete(controller.deleteTopic)
    .put(controller.alterTopic)

module.exports = router;