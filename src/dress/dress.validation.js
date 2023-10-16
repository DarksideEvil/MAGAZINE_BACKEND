const expressValidation = require('express-validation');
const Joi = require('joi');

//schema
const addDressSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    available: Joi.boolean().default(true),
    desc: Joi.string().min(2).required(),
    type: Joi.string(),
    count: Joi.number().default(1),
    rating: Joi.number(),
    price: Joi.number().required()
}).options({allowUnknown: false});

const editDressSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    available: Joi.boolean().default(true),
    desc: Joi.string().min(2),
    type: Joi.string(),
    count: Joi.number().default(1),
    rating: Joi.number(),
    price: Joi.number()
}).options({allowUnknown: false});

const idSchema = Joi.object({
    id: Joi.string().required()
   }).options({ allowUnknown: false });

//validation
const addDressValidate = expressValidation.validate({
    body: addDressSchema
});

const getDressValidate = expressValidation.validate({
    params: idSchema
});

const editDressValidate = expressValidation.validate({
    params: idSchema,
    body: editDressSchema
});

const deleteDressValidate = expressValidation.validate({
    params: idSchema
});

module.exports = {
    addDressValidate,
    getDressValidate,
    editDressValidate,
    deleteDressValidate
}