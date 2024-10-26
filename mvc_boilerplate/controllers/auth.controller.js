const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-statuses');
const { userService, authService } = require('./../services');
const tokenService = require('./../services/token.service');
 
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // Generate a JWT for the newly created user
  const token = await tokenService.generateAuthToken(user._id);
 
  res.status(httpStatus.CREATED.code).send({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  // generate token
  const token = await tokenService.generateAuthToken(user._id);
  res.status(httpStatus.OK.code).send({ user, token });
});
 
module.exports = {
  register,
  login,
};