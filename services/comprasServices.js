const { User } = require("../DB/models/user.model");
const {models} = require("../libs/sequelize");

class CompraServices {

	constructor(){}

	async find() {

		const compras = await models.Compra.findAll();
		return compras;
		
	}
	async findOne(id) {
		const compra = await models.Compra.findByPk(id,{
			include: ["comprador","items"]
		});
		console.log( "hola");
		return compra;
	}
	async create(idUser) {

		const compra = await models.Compra.create({
			idUser: idUser,
		} );
		return compra;
	}
	async update(idUser) {
		
		const compra = await models.Compra.findByPk(id);
		const change = await compra.update({
			idUser,
		})
		return change; 

	}
	async delete(id) {
		
		const compra = await models.Compra.findByPk(id);  
		await compra.destroy()
		return id; 
		 
	}
}
module.exports = CompraServices;
