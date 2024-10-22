const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-statuses');
const userService = require('./../services/user.service');
 
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED.code).send({ user });
});
 
module.exports = {
  register,
};