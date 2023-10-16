const {Joi, validate} = require('express-validation');
//schema
const addFoodSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
        available: Joi.boolean(),
        desc: Joi.string().min(2).required(),
        rating: Joi.number(),
        type: Joi.string(),
        category: Joi.string(),
        count: Joi.number(),
        price: Joi.number().required()
  }).options({ allowUnknown: false });

const editFoodSchema = Joi.object({
    title: Joi.string().min(3).max(50),
    available: Joi.boolean(),
    desc: Joi.string().min(2),
    rating: Joi.number(),
    type: Joi.string(),
    category: Joi.string(),
    count: Joi.number(),
    price: Joi.number()
}).options({ allowUnknown: false });

const idSchema = Joi.object({
 id: Joi.string().required()
}).options({ allowUnknown: false });

//validation
const addFoodValidate = validate({
    body: addFoodSchema
});

const getFoodValidate = validate({
    params: idSchema
});

const editFoodValidate = validate({
    params: idSchema,
    body: editFoodSchema
});

const deleteFoodValidate = validate({
    params: idSchema
});

module.exports = {
    addFoodValidate,
    getFoodValidate,
    editFoodValidate,
    deleteFoodValidate
}