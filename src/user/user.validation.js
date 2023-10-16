const {Joi, validate} = require('express-validation');

const addUserValidate = validate({
    body: Joi.object({
        fullname: Joi.string().min(3).max(50).required().error(err => console.log(err)),
        phone: Joi.number().error(err => console.log(err)),
        silverPoint: Joi.number().error(err => console.log(err)),
        goldPoint: Joi.number().error(err => console.log(err)),
        email: Joi.string().min(4).max(35).required().error(err => console.log(err)),
        role: Joi.string().min(3).max(20).error(err => console.log(err)),
        password: Joi.string().min(4).max(1024).required().error(err => console.log(err))
    }).options({allowUnknown: false})
});

const getUserValidate = validate({
    params: Joi.object({
        id: Joi.string().required()
    }).options({allowUnknown: false})
});

const editUserValidate = validate({
    params: Joi.object({
        id: Joi.string().required()
    }).options({allowUnknown: false}),
    body: Joi.object({
        fullname: Joi.string().min(3).max(50),
        phone: Joi.number(),
        silverPoint: Joi.number(),
        goldPoint: Joi.number(),
        email: Joi.string().min(4).max(35),
        role: Joi.string().min(3).max(20),
        password: Joi.string().min(4).max(1024)
	}).options({allowUnknown: false})
});

const deleteUserValidate = validate({
    params: Joi.object({
        id: Joi.string().required()
    }).options({allowUnknown: false}),
});

module.exports = {
    addUserValidate,
    getUserValidate,
    editUserValidate,
    deleteUserValidate
}