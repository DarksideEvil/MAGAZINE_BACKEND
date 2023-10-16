const Joi = require('joi');

const addElectronicValidate = (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      available: Joi.boolean(),
      desc: Joi.string().min(2).required(),
      rating: Joi.number(),
      type: Joi.string(),
      count: Joi.number(),
      guarantee: Joi.array(),
      service: Joi.boolean(),
      price: Joi.number().required()
    }).options({ allowUnknown: false });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };
  
  const getElectronicValidate = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required()
    }).options({ allowUnknown: false });
  
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };
  
  const editElectronicValidate = (req, res, next) => {
    const paramsSchema = Joi.object({
      id: Joi.string().required()
    }).options({ allowUnknown: false });
  
    const bodySchema = Joi.object({
      title: Joi.string().min(3).max(30),
      available: Joi.boolean(),
      desc: Joi.string().min(2),
      rating: Joi.number(),
      type: Joi.string(),
      count: Joi.number(),
      guarantee: Joi.array(),
      service: Joi.boolean(),
      price: Joi.number()
    }).options({ allowUnknown: false });
  
    const { error: paramsError } = paramsSchema.validate(req.params);
    const { error: bodyError } = bodySchema.validate(req.body);
  
    if (paramsError) {
      return res.status(400).json({ error: paramsError.details[0].message });
    }
  
    if (bodyError) {
      return res.status(400).json({ error: bodyError.details[0].message });
    }
  
    next();
  };
  
  const deleteElectronicValidate = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required()
    }).options({ allowUnknown: false });
  
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };
  
  module.exports = {
    addElectronicValidate,
    getElectronicValidate,
    editElectronicValidate,
    deleteElectronicValidate
  };