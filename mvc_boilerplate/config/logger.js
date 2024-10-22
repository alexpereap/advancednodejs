const winston = require('winston');
const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize } = format;
 
const winstonFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});
 
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp(),
    process.env.NODE_ENV === 'production' ? winstonFormat : combine(colorize(), winstonFormat)
  ),
  transports: [new transports.Console()],
});
 
module.exports = logger;