const imageProcessorQueue = require('./queues/image-processor');
const cacheProcessorQueue = require('./queues/cache-processor');
const { startImageProcessor } = require('./workers');
const { startCacheProcessor } = require('./workers');

module.exports = {
    ImageProcessor: {
        Queue: imageProcessorQueue,
        startWorker: startImageProcessor,
    },
    CacheProcessor: {
        Queue: cacheProcessorQueue,
        startWorker: startCacheProcessor,
    },
}