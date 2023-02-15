const Joi = require('joi')

const UserValidator = Joi.object({
    id: Joi.string().hex().length(24),
    firstName: Joi.string().alphanum().max(30).required(),
    lastName: Joi.string().alphanum().max(30).required(),
    birthDate: Joi.date().required(),
    address: Joi.allow(),
})

const AddressValidator = Joi.object({
    country: Joi.string().required(),
    state: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
})


module.exports = {
    UserValidator,
    AddressValidator,
}
