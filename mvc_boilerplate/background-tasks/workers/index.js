const { Worker } = require('bullmq');
const path = require('path');
const config = require('../../config/config');


const start = () => {
    const processorPath = path.join(__dirname, 'image-processor.js');
    const ImageProcessorWorker = new Worker(
        'ImageProcessor',
        processorPath,
        {
            connection: {
                host: config.redis.host,
                port: config.redis.port,
            },
            autorun: true
        },
    );

    ImageProcessorWorker.on('completed', (job) => `completed job ${job.id}` );
}

module.exports = { start };