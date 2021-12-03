const {models} = require("../libs/sequelize");

class ProductServices {

	constructor(){}

	async find() {

		const products = await models.Product.findAll();
		return products;
		
	}
	async findOne(id) {
		const product = await models.Product.findByPk(id);
		return product;
	}
	async create(name,description,image_url,price) {

		const product = await models.Product.create({
			name: name,
			description: description,
			image_url: image_url,
			price: price
		} );
		return product;
	}
	async update(id,name,description,image_url,price) {
		
		const product = await models.Product.findByPk(id);
		const change = await product.update({
			name:name,
			description: description,
			image_url: image_url,
			price: price
		})
		return change; 

	}
	async delete(id) {
		
		const product = await models.Product.findByPk(id);  
		await product.destroy()
		return id; 
		 
	}
}
module.exports = ProductServices;
