const router = require('express').Router();
const auth =require('../middlewares/authenticate');
const upload=require('../utils/uploadMaterial');
const controller=require('../controllers/material');


router
    .route('/courseId/:courseId')
    .post(auth.verifyToken,auth.verifyCourseMember,upload.uploadFile.any(),controller.materailUpload)
    .get(auth.verifyToken,controller.getFiles);
router 
    .route('/download/courseId/:courseId/fileId/:fileId')
    .get(auth.verifyToken,auth.verifyCourseMember,controller.downloadFiles);
router
    .route('/courseId/:courseId/fileId/:fileId')
    .get(auth.verifyToken,controller.getFile)
    .delete(auth.verifyToken,auth.verifyCourseMember,controller.deleteFile);
module.exports = router;