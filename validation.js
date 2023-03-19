const Joi = require('joi')

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

console.info(JSON.stringify(schema.validate({}, { abortEarly: false,  })))