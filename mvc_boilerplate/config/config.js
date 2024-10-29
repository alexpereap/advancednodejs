require('dotenv').config();
const envVarSchema = require('./../validations/env.validation');
const { value: envVars, error } = envVarSchema.validate(process.env); 

 
if (error) {
  console.error(`Config validation error: ${error.message}`);
}
 
module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.ENVIRONMENT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
  },
  rateLimiter: {
    maxAttemptsPerDay: envVars.MAX_ATTEMPTS_PER_DAY,
    maxAttemptsByIpUsername: envVars.MAX_ATTEMPTS_BY_IP_USERNAME,
    maxAttemptsPerEmail:envVars.MAX_ATTEMPTS_PER_EMAIL
  },
  cspOptions:{
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "'unsafe-inline'"],
    },
    reportOnly: true
  }
};