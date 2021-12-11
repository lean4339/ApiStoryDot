const Joi = require("joi");

const id = Joi.number();
const compraId = Joi.number();
const productId = Joi.number();
const amount = Joi.number()

const createSchema = Joi.object({

    id: id ,
    compraId: compraId.required(),
    productId: productId.required(), 
    amount: amount.required(),

});
const updateSchema = Joi.object({

    compraId: compraId.required(),
    productId: productId.required(),
    amount: amount.required(),

});

const getSchema = Joi.object({

    id: id.required(),

});
const deleteSchema = Joi.object({

    id: id.required(),

});

module.exports = {createSchema, updateSchema, getSchema,deleteSchema}