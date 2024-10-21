const Blog = require('./../models/blog.model');
const catchAsync = require('./../utils/catchAsync');
 
const createBlog = catchAsync(async (req, res, next) => {
  await Blog.create(req.body);
  res.send({ success: true, message: 'Blog created successfully' });
});
 
const getBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});
 
module.exports = {
  createBlog,
  getBlogs,
};