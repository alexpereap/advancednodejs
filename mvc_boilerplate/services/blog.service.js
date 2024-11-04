const ApiError = require('../utils/ApiError');
const  Blog = require('./../models/blog.model');
const fs = require('fs');
const httpStatus = require('http-statuses');
const { CacheProcessor } = require('../background-tasks');

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

    t1 = {blogs};
    await CacheProcessor.Queue.add('CacheProcessorJob', { blogs } )
    await CacheProcessor.startWorker();

    return blogs;
};

module.exports = {
    getReadableFileStream,
    getRecentBlogs,
}