const Joi = require('joi')

const UserValidator = Joi.object({
    id: Joi.number().optional(),
    firstName: Joi.string().alphanum().max(30).required(),
    lastName: Joi.string().alphanum().max(30).required(),
    birthDate: Joi.date().required()
})


module.exports = {
    UserValidator
}