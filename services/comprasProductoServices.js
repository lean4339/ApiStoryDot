const {models} = require("../libs/sequelize");

class CompraProductoServices {

	constructor(){}

	async find() {

		const relation = await models.CompraProducto.findAll();
		return relation;
		
	}
	async findOne(id) {
		const relation = await models.CompraProducto.findByPk(id);
		return relation;
	}
	async create(compraId,productId,amount) {

		const relation = await models.CompraProducto.create({
			compraId: compraId,
            productId: productId,
			amount:amount,
		} );
		return relation;
	}
	async update(compraId,productId,amount) {
		
		const relation = await models.CompraProducto.findByPk(id);
		const change = await relation.update({
			compraId: compraId,
            productId: productId,
			amount,
		})
		return change; 

	}
	async delete(id) {
		
		const compra = await models.CompraProducto.findByPk(id);  
		await compra.destroy()
		return id; 
		 
	}
}
module.exports = CompraProductoServices;
