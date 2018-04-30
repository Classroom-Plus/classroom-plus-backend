const multer = require('multer');
const path = require('path');

const storage = (destination) => {
    return multer.diskStorage({
        destination: destination,
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        }
    });
};

const checkType = (types, file, cb) => {
    const filetypes = types;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Invalid File Type!'));
    }
};

const uploadFile = multer({
    storage: storage(path.resolve(__dirname, '../public/files')),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        checkType(/docx|doc|pptx|ppt|xlsx|xls|pdf/, file, cb);
    }
});

const uploadImage = multer({
    storage: storage(path.resolve(__dirname, '../public/images')),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        checkType(/jpeg|jpg|png|gif/, file, cb);
    }
});

module.exports = {
    uploadFile,
    uploadImage,
};