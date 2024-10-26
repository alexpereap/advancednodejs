const express = require('express');
const router = express.Router();
const validate = require('./../middlewares/validate');
const userValidation = require('./../validations/user.validation');
const authController = require('./../controllers/auth.controller');
const authValidation = require('./../validations/auth.validation'); 
 
router.post(
  '/auth/register',
  validate(userValidation.createUserSchema),
  authController.register
);

router.post(
  '/auth/login',
  validate(authValidation.loginSchema),
  authController.login
);
 
module.exports = router;
