const { Queue } = require('bullmq');
const config = require('../../config/config');

const CacheProcessorQueue = new Queue('CacheProcessor', {
    connection: {
        host: config.redis.host,
        port: config.redis.port,
    },
})

module.exports = CacheProcessorQueue;