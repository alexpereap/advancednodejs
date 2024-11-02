const ApiError = require('../utils/ApiError');
const  Blog = require('./../models/blog.model');
const fs = require('fs');
const httpStatus = require('http-statuses');
const sharp = require('sharp');

const getReadableFileStream = async (filename) => {
    const filePath = `${__dirname}/../uploads/${filename}`;
    if (!fs.existsSync(filePath)) {
        throw new ApiError(httpStatus.NOT_FOUND.code, 'File not found');
    }

    const stream = fs.createReadStream(filePath);
    return stream;
};

const uploadFile = async (file) => {
    const filename = `image-${Date.now()}.webp`;
    const outputPath = `${__dirname}/../uploads/${filename}`;
    sharp(file.buffer).resize(600).webp({ lossless: true }).toFile(outputPath);
    return filename;
};

module.exports = {
    uploadFile,
    getReadableFileStream,
}