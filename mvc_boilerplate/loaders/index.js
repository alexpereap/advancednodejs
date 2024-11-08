const fs = require('fs');
const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const logger = require('../config/logger');
const subscribers = require('../subscribers');
const EventEmitter = require('../utils/EventEmitter');
const redisClient = require('../config/redis');
const createworker = require('../background-tasks/workers');
const path = require('path');
 
module.exports = async (app) => {
  await mongooseLoader();
  logger.info('Mongoose initiated.');
  await redisClient.connect();
  logger.info('Redis connected');
  await expressLoader(app);
  logger.info('Express app initiated.');

  Object.keys(subscribers).forEach((eventName) => {
    EventEmitter.on(eventName, subscribers[eventName]);
  });

  fs.access('uploads', fs.constants.F_OK, async (err) => {
    if (err) {
      await fs.promises.mkdir('uploads');
    }
  });

  const workers = [
    {name: 'ImageProcessor', filename: 'image-processor.js'},
    {name: 'CacheProcessor', filename: 'cache-processor.js'}
  ];

  workers.forEach(async (worker) => {
    await createworker(worker.name, worker.filename);
  });
};
