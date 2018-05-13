const router = require('express').Router();
const auth =require('../middlewares/authenticate');
const upload=require('../utils/upload');
const controller=require('../controllers/material');


router
    .route('/courseId/:courseId')
    .post(auth.verifyToken,auth.verifyCourseMember,upload.uploadFile.any(),controller.materailUpload)
    .get(auth.verifyToken,auth.verifyCourseMember,controller.getFiles);
router
    .route('/courseId/:courseId/fileId/:fileId')
    .get(auth.verifyToken,auth.verifyCourseMember,controller.getFile)
    .delete(auth.verifyToken,auth.verifyCourseMember,controller.deleteFile);
module.exports = router;