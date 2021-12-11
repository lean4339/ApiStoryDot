const Joi = require("joi");

const id = Joi.number();
const idUser = Joi.number();
const idProduct = Joi.number();

const createSchema = Joi.object({

    id: id ,
    idUser: idUser.required(),

});
const updateSchema = Joi.object({

    idUser: idUser.required(),

});

const getSchema = Joi.object({

    id: id.required(),

});
const deleteSchema = Joi.object({

    id: id.required(),

});

module.exports = {createSchema, updateSchema, getSchema,deleteSchema}