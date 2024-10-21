const mongoose = require('mongoose');
const config = require('./../config/config');
const ApiError = require('./../utils/ApiError');
const httpStatus = require('http-status');
 
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, error.stack);
  }
  next(error);
};
 
/* We have introduced the errorConverter function that first checks if the error is an instance of ApiError.
  If it's not, it proceeds to convert it. The status code is determined based on whether the error already 
  has a status code or if it's a Mongoose error (which defaults to 400). If neither condition is met, 
  it defaults to 500 for internal server errors. The message is set to either the error message or the default
  message associated with the status code. Finally, a new ApiError instance is created with the determined
  status code, message, and stack trace, and the newly created ApiError is passed to the next middleware.
*/
 
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }
  const response = {
    error: true,
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };
  res.locals.errorMessage = message;
  if (config.env === 'development') {
    console.log(err);
  }
  res.status(statusCode).send(response);
};
 
module.exports = {
  errorHandler,
  errorConverter,
};
