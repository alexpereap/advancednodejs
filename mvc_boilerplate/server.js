const express = require('express');
const app = express();
const blogRouter = require('./routes/blog.route');
const authRouter = require('./routes/auth.route');
const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-statuses');
const morgan = require('./config/morgan');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const {xss} = require("express-xss-sanitizer")
const helmet = require("helmet")
const config = require("./config/config")
const mongoSanitize = require("express-mongo-sanitize")
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(mongoSanitize());
app.use(morgan);

 
app.use(express.json());
app.use(helmet.contentSecurityPolicy(config.cspOptions));
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noSniff());
app.use(xss());
app.use(blogRouter);
app.use(authRouter);
 
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
 
app.use(errorConverter);
app.use(errorHandler);
 
module.exports = app;
