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
  },
};