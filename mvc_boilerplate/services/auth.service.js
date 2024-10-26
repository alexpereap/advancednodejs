const userService = require('./user.service');
const tokenService = require('./token.service');
const httpStatus = require('http-statuses');
const ApiError = require('../utils/ApiError');
const logger = require('./../config/logger');
const { tokenTypes } = require('./../config/tokens')
 
const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const refreshAuthToken = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user.id);
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED.code, 'Please authenticate');
  }
};
 
module.exports = {
  login,
  refreshAuthToken,
};