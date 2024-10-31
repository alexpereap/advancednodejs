const express = require('express');
const upload = require('../utils/multer');
const router = express.Router();
const { createBlogSchema, getBlogSchema } = require('./../validations/blog.validation');
const validate = require('./../middlewares/validate');
const { createBlog, getBlogs, uploadFile } = require('./../controllers/blog.controller');
const auth = require('../middlewares/auth');
 
// Route to get all blogs
router.get('/blogs', auth, validate(getBlogSchema), getBlogs);
 
// Route to create a blog with validation middleware
router.post('/blog', auth, validate(createBlogSchema), createBlog);

router.post(
    '/blog/cover-image',
    auth,
    upload.single('coverImage'),
    uploadFile
);
 
module.exports = router;