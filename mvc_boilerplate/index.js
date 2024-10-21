const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.route');
const config = require('./config/config');
// import middleware
const { errorHandler, errorConverter } = require('./middlewares/error'); 
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
 
mongoose
  .connect(config.dbConnection)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });
 
app.use(express.json());
app.use(blogRouter);
 
// Add the error converter before the error handler
app.use(errorConverter);
app.use(errorHandler); 
 
const server = app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});
