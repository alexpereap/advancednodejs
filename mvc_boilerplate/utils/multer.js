const multer = require('multer');
const ApiError = require('./ApiError');
const httpStatus = require('http-statuses');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = `${__dirname}/../uploads`;
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    }
});

module.exports = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        const maxFileSize = 3 * 1024 * 1024;
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new ApiError(httpStatus.BAD_REQUEST.code, 'Only images are allowed'), false);
        } else if (file.size > maxFileSize) {
            cb(new ApiError(httpStatus.BAD_REQUEST.code, 'File size should not exceed 3 MB'), false);
        } else {
            cb(null, true);
        }
    }
});
