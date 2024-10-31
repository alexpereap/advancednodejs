const ApiError = require('../utils/ApiError');
const Blog = require('./../models/blog.model');
const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-statuses');
const blogService = require('./../services/blog.service');
 
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
  const filePath = await blogService.uploadFile(req.body);
  res.status(httpStatus.OK.code).json({filePath: "/uploads/" + req.file.filename});
});
 
module.exports = {
  createBlog,
  getBlogs,
  uploadFile,
};