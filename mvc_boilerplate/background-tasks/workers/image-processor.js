const sharp = require('sharp');
const logger = require('./../../config/logger');

module.exports = async (job) => {
    const { file, fileName, fileBuffer } = job.data;
    const outputPath = `${__dirname}/../../uploads/${fileName}`;
    const buffer = Buffer.from(fileBuffer, 'hex');
    sharp(buffer)
        .resize(600)
        .webp({ lossless: true })
        .toFile(outputPath)
        .then( data => {
            logger.info('image saved');
        } )
        .catch(err => {
            logger.error(err);
        });
};