const Joi = require("joi");

const id = Joi.number();
const name = Joi.string();
const description = Joi.string();
const image_url = Joi.string();
const price = Joi.number();

const createSchema = Joi.object({

    id: id , 
    name: name.required(),
    description: description.required(),
    image_url: image_url.required(),
    price: price.required(),

});
const updateSchema = Joi.object({

    name: name,
    description: description,
    image_url: image_url,
    price: price,

});

const getSchema = Joi.object({

    id: id.required(),

});
const deleteSchema = Joi.object({

    id: id.required(),

});

module.exports = {createSchema, updateSchema, getSchema,deleteSchema}