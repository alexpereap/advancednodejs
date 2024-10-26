const ApiError = require('./../utils/ApiError');
const httpStatus = require('http-statuses');
const passport = require('passport');
const logger = require('./../config/logger');
 
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    logger.error(err || info);
    return reject(new ApiError(httpStatus.UNAUTHORIZED.code, 'Please authenticate'));
  }
  req.user = user;
  resolve();
};
 
const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};
 
module.exports = auth;
