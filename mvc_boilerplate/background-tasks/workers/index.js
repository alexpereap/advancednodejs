const { Worker } = require('bullmq');
const config = require('../../config/config');
const logger = require('../../config/logger');
const path = require('path');

const createWorker = async (name, filename) => {
    const processorPath = path.join(__dirname, filename);
    const worker = new Worker(
        name,
        processorPath,
        {
            connection: {
                host: config.redis.host,
                port: config.redis.port,
            },
            autorun: true,
        },
    );

    worker.on('completed', (job) => 
        logger.info(`${job.name} completed job ${job.id}`)
    );

    worker.on('failed', (job) => 
        logger.info(`${job.name} failed job ${job.failedReason}`)
    );
}

module.exports = createWorker;