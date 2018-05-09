const router = require('express').Router();
const course = require('../controllers/course');
const courseUser = require('../controllers/courseUser');
const { verifyToken, verifyCourseMember, verifyCourseManger } = require('../middlewares/authenticate');
const { uploadImages } = require('../utils/uploader');


/* ----------  Route for course user  ---------- */
router
    .route('/')
    .get(course.getCourseList)
    .post(verifyToken, uploadImages, course.createCourse);

router
    .route('/self')
    .get(verifyToken, course.getUserCourseList)

router
    .route('/:courseId')
    .put(verifyToken, verifyCourseManger, uploadImages, course.updateCourse)
    .delete(verifyToken, verifyCourseManger, course.deleteCourse);

/* ----------  Route for course user  ---------- */
router
    .route('/:courseId/user')
    .get(verifyToken, verifyCourseMember, courseUser.getUserList)
    .post(verifyToken);

router
    .route('/:courseId/user/:userId')
    .put(verifyToken, verifyCourseManger)
    .delete(verifyToken, verifyCourseManger);


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