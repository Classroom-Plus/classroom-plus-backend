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

const checkType = (types, file) => {
    const filetypes = types;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return true;
    } else {
        return false;
    }
};

const messagestorage = (destination) => {
    return multer.diskStorage({
        destination: function(req,file,cb){
            let dir ;
            if(checkType(/jpeg|jpg|png|gif/,file)) dir='images';
            else dir = 'files';
            console.log(path.join(destination,dir));
            cb(null,path.join(destination,dir))
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${req.authData.id}${path.extname(file.originalname)}`);
        }
    });
};


const uploadFile = multer({
    storage: storage(path.resolve(__dirname, '../public/course')),
    limits: { fileSize: 50 * 1024 * 1024 },
});

const uploadMessage = multer({
    storage: messagestorage(path.resolve(__dirname, '../public/')),
    limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports={
    uploadFile,
    uploadMessage
}