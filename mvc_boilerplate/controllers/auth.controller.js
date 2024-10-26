const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-statuses');
const { userService, authService } = require('./../services');
const tokenService = require('./../services/token.service');
 
const register = catchAsync(async (req, res) => {
  // create a user
  const user = await userService.createUser(req.body);
  // generate token
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED.code).send({ user, tokens });
});
 
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);

  // generate token
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.OK.code).send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuthToken(req.body.refreshToken);
  res.status(httpStatus.OK.code).send({ ...tokens });
});

module.exports = {
  register,
  login,
  refreshToken,
};