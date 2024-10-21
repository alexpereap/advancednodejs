const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.route');
const config = require('./config/config');
const { errorHandler } = require('./middlewares/error');
 
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
app.use(errorHandler);
 
app.listen(config.port, () => {
  console.log('server listening on port 3000');
});