const Joi = require('joi');

const UserSchema = Joi.object({
    usuario: Joi.string()
        .min(3)
        .max(30),
    senha: Joi.string()
        .min(8)
        .max(30)
}).with('usuario', 'email');

module.exports = UserSchema;