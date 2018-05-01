const multer = require('multer');
const path= require('path');

const storage = (destination) => {
    return multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,path.join(destination,req.params.courseId))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
};

const uploadFile = multer({
    storage: storage(path.resolve(__dirname, '../public/course')),
    limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports={
    uploadFile,
}