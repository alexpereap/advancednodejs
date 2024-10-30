const Blog = require('./../models/blog.model');
const catchAsync = require('./../utils/catchAsync');
 
const createBlog = catchAsync(async (req, res, next) => {
  await Blog.create({...req.body, createdBy: req.user.id});
  res.send({ success: true, message: 'Blog created successfully' });
});
 
const getBlogs = catchAsync(async (req, res, next) => {
  // user id can be also get via req.user.id to get current logged in userid

  const blogs = await Blog.find({createdBy: req.body.userId});
  res.json(blogs);
});
 
module.exports = {
  createBlog,
  getBlogs,
};