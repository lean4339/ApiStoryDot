const Joi = require("joi");

const id = Joi.number();
const name = Joi.string();
const username = Joi.string();
const image_url = Joi.string();
const email = Joi.string();
const password = Joi.string();

const createSchema = Joi.object({

    id: id , 
    name: name.required(),
    username: username.required(),
    email: email.required(),
    image_url: image_url.required(),
    password: password.required(),
});
const updateSchema = Joi.object({

    name: name,
    username: username,
    email: email,
    image_url: image_url,

});

const getSchema = Joi.object({

    id: id.required(),

});
const deleteSchema = Joi.object({

    id: id.required(),

});

module.exports = {createSchema, updateSchema, getSchema,deleteSchema}