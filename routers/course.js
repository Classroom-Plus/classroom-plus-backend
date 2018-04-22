const router = require('express').Router();

/* ----------  Route for course user  ---------- */
router
    .route('/')
    .get()
    .post();

router
    .route('/:courseId')
    .get()
    .put()
    .delete();


/* ----------  Route for course user  ---------- */
router
    .route('/:courseId/user')
    .get()
    .post();

router
    .route('/:courseId/user/:userId')
    .get()
    .put()
    .delete();


/* ----------  Route for course topic  ---------- */
router
    .route('/:courseId/topic')
    .get()
    .post();

router
    .route('/:courseId/topic/:topicId')
    .get()
    .put()
    .delete();


/* ----------  Route for course topic message  ---------- */
router
    .route('/topic/:topicId/message')
    .get()
    .post();

router
    .route('/topic/:topicId/message/:messageId')
    .get()
    .put()
    .delete();

router
    .route('/topic/:topicId/message/:messageId/:referId')   //message reply refer to another message
    .post();

module.exports = router;