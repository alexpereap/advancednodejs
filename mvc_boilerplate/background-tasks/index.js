const imageProcessorQueue = require('./queues/image-processor');

module.exports = {
    ImageProcessor: {
        Queue: imageProcessorQueue,
    }
}