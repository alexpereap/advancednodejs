const ApiError = require('../utils/ApiError');
const Blog = require('./../models/blog.model');
const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-statuses');
const blogService = require('./../services/blog.service');
const imageProcessorQueue = require('../background-tasks/queues/image-processor');
const workers = require('../background-tasks/workers');
const { ImageProcessor } = require('../background-tasks');
 
const createBlog = catchAsync(async (req, res, next) => {
  await Blog.create({...req.body, createdBy: req.user.id});
  res.send({ success: true, message: 'Blog created successfully' });
});
 
const getBlogs = catchAsync(async (req, res, next) => {
  // user id can be also get via req.user.id to get current logged in userid

  const blogs = await Blog.find({createdBy: req.body.userId});
  res.json(blogs);
});

const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND.code, 'File not found');
  }

  const fileName = `image-${Date.now()}.webp`;
  await ImageProcessor.Queue.add('ImageProcessorJob', { fileName, file: req.file, fileBuffer: req.file.buffer.toString('hex') });
  await workers.start();
  res.status(httpStatus.OK.code).json({fileName});
});

const getFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const stream = await blogService.getReadableFileStream(req.params.filename);
  const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
  res.setHeader('Content-Type', contentType);
  stream.pipe(res);
});
 
module.exports = {
  createBlog,
  getBlogs,
  uploadFile,
  getFile,
};