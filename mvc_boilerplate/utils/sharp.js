const sharp = require('sharp');
const logger = require('./../config/logger');

const compressImage = (inputBuffer, fileName) => {
    const outputPath = `${__dirname}/../uploads/${fileName}`;
    sharp(inputBuffer)
        .resize(600)
        .webp({ lossless: true })
        .toFile(outputPath)
        .then( data => {
            logger.info('image saved');
        } )
        .catch(err => {
            logger.error(err);
        });
}

module.exports = { compressImage }