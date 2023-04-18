const Joi = require('joi')

const userValidator = Joi.object({
    id: Joi.string().hex().length(24).optional(),
    name: Joi.string().max(50).required(),
    password: Joi.string().max(80).required(),
    email: Joi.string().email().max(100).required(),
    birthDate: Joi.date().required(),
    isActive: Joi.boolean().optional(),
    address: Joi.allow(),
})

const addressValidator = Joi.object({
    country: Joi.string().required(),
    state: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
})


module.exports = {
    userValidator,
    addressValidator,
}
