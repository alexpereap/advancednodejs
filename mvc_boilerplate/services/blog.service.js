const ApiError = require('../utils/ApiError');
const  Blog = require('./../models/blog.model');
const fs = require('fs');
const httpStatus = require('http-statuses');

const getReadableFileStream = async (filename) => {
    const filePath = `${__dirname}/../uploads/${filename}`;
    if (!fs.existsSync(filePath)) {
        throw new ApiError(httpStatus.NOT_FOUND.code, 'File not found');
    }

    const stream = fs.createReadStream(filePath);
    return stream;
};
module.exports = {
    getReadableFileStream,
}