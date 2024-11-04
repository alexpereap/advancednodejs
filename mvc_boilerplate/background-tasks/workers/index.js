const { Worker } = require('bullmq');
const path = require('path');
const config = require('../../config/config');
const logger = require('../../config/logger');

const startImageProcessor = () => {
    const processorPath = path.join(__dirname, 'image-processor.js');
    const ImageProcessorWorker = new Worker(
        'ImageProcessor',
        processorPath,
        {
            connection: {
                host: config.redis.host,
                port: config.redis.port,
            },
            autorun: true,
            // removeOnComplete: true, // removes once completed, dont include if completed works need to be analyzed later on
            concurrency: 3 // how many works to process simultaneously
        },
    );

    ImageProcessorWorker.on('completed', (job) => 
        logger.info(`image processor completed job ${job.id}`)
    );
}

const startCacheProcessor = () => {
    const processorPath = path.join(__dirname, 'cache-processor.js');
    const CacheProcessorWorker = new Worker(
        'CacheProcessor',
        processorPath,
        {
            connection: {
                host: config.redis.host,
                port: config.redis.port,
            },
            autorun: true,
        },
    );

    CacheProcessorWorker.on('completed', (job) => 
        logger.info(`cache processor completed job ${job.id}`)
    );

    CacheProcessorWorker.on('failed', (job) => 
        logger.info(`cache processor failed job ${job.failedReason}`)
    );
}

module.exports = {
    startImageProcessor,
    startCacheProcessor,
};