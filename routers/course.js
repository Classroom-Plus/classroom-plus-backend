const router = require('express').Router();
const course = require('../controllers/course');
const { verifyToken, verifyCourseMember } = require('../middlewares/authenticate');
const { uploadImage } = require('../utils/uploader');


/* ----------  Route for course user  ---------- */
router
    .route('/')
    .get(course.getCourseList)
    .post(verifyToken, uploadImage.any(), course.createCourse);

router
    .route('/self')
    .get(verifyToken, course.getUserCourseList)

router
    .route('/:courseId')
    .put(verifyToken, verifyCourseMember, uploadImage.any(), course.updateCourse)
    .delete(verifyToken, verifyCourseMember, course.deleteCourse);

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