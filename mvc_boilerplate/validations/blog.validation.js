const joi = require('joi');
const { objectId } = require('./custom.validation');
 
const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    // createdBy:joi.string().required().custom(objectId)
  }),
};

const getBlogSchema = {
  body: joi.object({
    userId:joi.string().required().custom(objectId)
  }),
};
 
module.exports = {
  createBlogSchema,
  getBlogSchema,
};