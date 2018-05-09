const router = require('express').Router();
const auth = require('../middlewares/authenticate');
const controller = require('../controllers/search');
router
    .route('/courseId/:courseId')
    .post(auth.verifyToken,auth.verifyCourseMember,controller.search);
module.exports = router;