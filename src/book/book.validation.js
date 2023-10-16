const Joi = require('joi');
const { validate } = require('express-validation');

//schema
const addBookSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  available: Joi.boolean(),
  desc: Joi.string().min(2).required(),
  rating: Joi.number(),
  count: Joi.number(),
  price: Joi.number().required()
}).options({ allowUnknown: false });

const editBookSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  available: Joi.boolean(),
  desc: Joi.string().min(2),
  rating: Joi.number(),
  count: Joi.number(),
  price: Joi.number()
}).options({ allowUnknown: false });

const idSchema = Joi.object({
  id: Joi.string().required()
}).options({ allowUnknown: false });


//validation
const addBookValidate = validate({
  body: addBookSchema
});

const getBookValidate = validate({
  params: idSchema
});

const editBookValidate = validate({
  params: idSchema,
  body: editBookSchema
});

const deleteBookValidate = validate({
  params: idSchema
});

module.exports = {
  addBookValidate,
  getBookValidate,
  editBookValidate,
  deleteBookValidate
};