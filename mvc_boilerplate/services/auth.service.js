const userService = require('./user.service');
const tokenService = require('./token.service');
const httpStatus = require('http-statuses');
const ApiError = require('../utils/ApiError');
const logger = require('./../config/logger');
const { tokenTypes } = require('./../config/tokens')
const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const config = require("../config/config")
 
const login = async (email, password,ipAddr) => {
 
 
  const emailIpBruteLimiter = new RateLimiterMongo({
      storeClient:mongoose.connection,
      points:config.rateLimiter.maxAttemptsByIpUsername,
      duration:60*10,
      blockDuration:60*60*24,
      dbName:"blog_app"
  })
   
  const slowerBruteLimiter = new RateLimiterMongo({
      storeClient:mongoose.connection,
      points:config.rateLimiter.maxAttemptsPerDay,
      duration:60*60*24,
      blockDuration:60*60*24,
      dbName:"blog_app"
  })
   
  const emailBruteLimiter = new RateLimiterMongo({
    storeClient:mongoose.connection,
    points:config.rateLimiter.maxAttemptsPerEmail,
    duration:60*60*24,
    blockDuration:60*60*24,
    dbName:"blog_app"
  })
   
    const promises = [slowerBruteLimiter.consume(ipAddr)]
    const user = await userService.getUserByEmail(email);
   
    if (!user || !(await user.isPasswordMatch(password))) {
      user && promises.push([emailIpBruteLimiter.consume(`${email}_${ipAddr}`),emailBruteLimiter.consume(email)])
      await Promise.all(promises)
      throw new ApiError(httpStatus.UNAUTHORIZED.code, 'Incorrect email or password');
    }
    return user;
  };
   
  const refreshAuthToken = async (refreshToken) => {
    console.log("refreshToken",refreshToken);
    try {
      const refreshTokenDoc = await tokenService.verifyToken(
        refreshToken,
        tokenTypes.REFRESH
      );
      console.log("refreshTokenDoc",refreshTokenDoc);
      const user = await userService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      console.log("refreshTokenDoc=>",refreshTokenDoc);
      await refreshTokenDoc.deleteOne();
      return tokenService.generateAuthTokens(user.id);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED.code, 'Please authenticate');
    }
  };
   
  module.exports = {
    login,
    refreshAuthToken
  };