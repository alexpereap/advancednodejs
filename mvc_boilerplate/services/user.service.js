const User = require('./../models/user.model');
const ApiError = require('./../utils/ApiError');
const httpStatus = require('http-statuses');
 
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }
  const user = await User.create(userBody);
  return user;
};
 
module.exports = {
  createUser,
};
