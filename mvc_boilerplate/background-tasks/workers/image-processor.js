// const sharp = require('sharp');

const { compressImage } = require('../../utils/sharp');

const logger = require('./../../config/logger');

module.exports = async (job) => {
    const { file, fileName, fileBuffer } = job.data;
    const buffer = Buffer.from(fileBuffer, 'hex');

    compressImage(buffer, fileName);
    
};