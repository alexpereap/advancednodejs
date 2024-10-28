const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const ApiError = require('./../utils/ApiError');
const httpStatus = require('http-statuses');
 
const maxAttemptsPerDay = 100;
const maxAttemptsByIpUsername = 10;
 
const emailIpBruteLimiter = new RateLimiterMongo({
    storeClient:mongoose.connection,
    points:maxAttemptsByIpUsername,
    duration:60*10,
    blockDuration:60*60*24,
    dbName:"blog_app"
})
 
const slowerBruteLimiter = new RateLimiterMongo({
    storeClient:mongoose.connection,
    points:maxAttemptsPerDay,
    duration:60*60*24,
    blockDuration:60*60*24,
    dbName:"blog_app"
})
 
const authLimiter = async (req, res, next) => {
    const ipAddr = req.connection.remoteAddress;
    const emailIpKey = `${req.body.email}_${ipAddr}`;
    const [slowerBruteRes, emailIpRes] = await Promise.all([
      slowerBruteLimiter.get(ipAddr),
      emailIpBruteLimiter.get(emailIpKey),
 
    ]);
    let retrySeconds = 0;
    if (
      slowerBruteRes &&
      slowerBruteRes.consumedPoints >= maxAttemptsPerDay
    ) {
      retrySeconds = Math.floor(slowerBruteRes.msBeforeNext / 1000) || 1;
    } else if (
      emailIpRes &&
      emailIpRes.consumedPoints >= maxAttemptsByIpUsername
    ) {
      retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1;
    } 
  
    if (retrySeconds > 0) {
      res.set('Retry-After', String(retrySeconds));
      return next(
        new ApiError(httpStatus.TOO_MANY_REQUESTS.code, 'Too many requests'),
      );
    }
  
    next();
  };
 
  module.exports = {
    emailIpBruteLimiter,
    slowerBruteLimiter,
    authLimiter,
  };
