const {Product, ProductsSchema} = require("./product.model");
function setupModels(sequelize){

    Product.init(ProductsSchema,Product.config(sequelize));
}

module.exports= setupModels;