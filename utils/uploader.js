const multer = require('multer');
const path = require('path');

const storage = (destination, uploadedBy) => {
    return multer.diskStorage({
        destination: destination,
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${uploadedBy}${path.extname(file.originalname)}`);
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

const uploadFiles = (req, res, next) => {
    console.log(req);
    multer({
        storage: storage(path.resolve(__dirname, '../public/files', req.authData.id)),
        limits: { fileSize: 50 * 1024 * 1024 },
        fileFilter: function (req, file, cb) {
            checkType(/docx|doc|pptx|ppt|xlsx|xls|pdf/, file, cb);
        }
    }).any()(req, res, (err) => {
        if (err) {
            return res.json({
                status: false,
                errors: { msg: `invaid type for upload files` }
            })
        } else {
            next();
        }
    });
};

const uploadImages = (req, res, next) => {
    multer({
        storage: storage(path.resolve(__dirname, '../public/images'), req.authData.id),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: function (req, file, cb) {
            checkType(/jpeg|jpg|png|gif/, file, cb);
        }
    }).any()(req, res, (err) => {
        if (err) {
            return res.json({
                status: false,
                errors: { msg: `invaid type for upload files` }
            })
        } else {
            next();
        }
    });
};

module.exports = {
    uploadFiles,
    uploadImages
};