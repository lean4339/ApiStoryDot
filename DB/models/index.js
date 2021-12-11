const {Product, ProductsSchema} = require("./product.model");
const {User,UsersSchema} = require("../models/user.model");
const { Compra, ComprasSchema } = require("./compras.model");
const {CompraProducto,CompraProductoSchema} = require("./compraProducto.model");
function setupModels(sequelize){

    Product.init(ProductsSchema,Product.config(sequelize));
    User.init(UsersSchema,User.config(sequelize));
    Compra.init(ComprasSchema,Compra.config(sequelize));
    CompraProducto.init(CompraProductoSchema,CompraProducto.config(sequelize));

    User.associate(sequelize.models);
    Product.associate(sequelize.models);
    Compra.associate(sequelize.models);
    CompraProducto.associate(sequelize.models);

}

module.exports= setupModels;