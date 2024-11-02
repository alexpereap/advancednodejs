const ApiError = require('../utils/ApiError');
const  Blog = require('./../models/blog.model');
const fs = require('fs');
const httpStatus = require('http-statuses');
const redisClient = require('../config/redis');

const getReadableFileStream = async (filename) => {
    const filePath = `${__dirname}/../uploads/${filename}`;
    if (!fs.existsSync(filePath)) {
        throw new ApiError(httpStatus.NOT_FOUND.code, 'File not found');
    }

    const stream = fs.createReadStream(filePath);
    return stream;
};

const getRecentBlogs = async () => {
    const blogs = await Blog.find().sort({
        createdAt: -1,
    }).limit(3);
    redisClient.set('recent-blogs', JSON.stringify(blogs));

    return blogs;
};

module.exports = {
    getReadableFileStream,
    getRecentBlogs,
}