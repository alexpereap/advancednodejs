const express = require('express');
const router = express.Router();
const { createBlogSchema, getBlogSchema } = require('./../validations/blog.validation');
const validate = require('./../middlewares/validate');
const { createBlog, getBlogs } = require('./../controllers/blog.controller');
const auth = require('../middlewares/auth');
 
// Route to get all blogs
router.get('/blogs', auth, validate(getBlogSchema), getBlogs);
 
// Route to create a blog with validation middleware
router.post('/blog', auth, validate(createBlogSchema), createBlog);
 
module.exports = router;