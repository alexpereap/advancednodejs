const Blog = require('./../models/blog.model');
const { createBlogSchema } = require('./../validations/blog.validation');
 
const createBlog = async (req, res) => {
  try {
    // Validate the request body
    const value = await createBlogSchema.body.validateAsync(req.body);
 
    // Create the blog with the validated data
    await Blog.create(value);
 
    res.send({ success: true, message: 'Blog created successfully' });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: error.details });
  }
};
 
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};
 
module.exports = {
  createBlog,
  getBlogs,
};