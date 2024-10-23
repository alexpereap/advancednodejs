const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-statuses');
const userService = require('./../services/user.service');
const tokenService = require('./../services/token.service');
 
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // Generate a JWT for the newly created user
  const token = await tokenService.generateAuthToken(user._id);
 
  res.status(httpStatus.CREATED.code).send({ user, token });
});
 
module.exports = {
  register,
};