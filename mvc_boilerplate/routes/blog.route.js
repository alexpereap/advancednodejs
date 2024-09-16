const express = require('express');
const router = express.Router();
const { createBlogSchema } = require('./../validations/blog.validation');
const validate = require('./../middlewares/validate');
const { createBlog, getBlogs } = require('./../controllers/blog.controller');
 
// Route to get all blogs
router.get('/blogs', getBlogs);
 
// Route to create a blog with validation middleware
router.post('/blog', validate(createBlogSchema), createBlog);
 
module.exports = router;