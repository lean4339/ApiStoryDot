const {models} = require("../libs/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ConnectionRefusedError, Association } = require("sequelize/dist");

class UserServices {

	constructor(){}

	async find() {

		const users = await models.User.findAll();
		return users;
		
	}
	async findOne(id) {
		const user = await models.User.findByPk(id,{
			include: [{association:"compras",include:"items"}]
			
		});
		return user;
	}
	async create(name,username,email,password,image_url) {
		const encript = bcrypt.hashSync(password,10);
		const user = await models.User.create({
			name: name,
            username: username,
            email: email,
            password: encript,
			image_url: image_url,
		} );
		return user;
	}
	async update(id,name,username,email,image_url) {
		
		const user = await models.User.findByPk(id);
		const change = await user.update({
			name:name,
            username: username,
            email: email,
			image_url: image_url,
		})
		return change; 

	}
	async delete(id) {
		
		const user = await models.User.findByPk(id);  
		await user.destroy()
		return id; 
		 
	}
	async login(email,password){
		 const user = await models.User.findOne({
			 where :{email: email}
		 });
		 if(user){

			const pas = bcrypt.compareSync(password,user.password);
			
			if(pas){
				let token = jwt.sign({user: user.name},"secret",{expiresIn: 60*60});
				
				return token;
			}
			else{
				return "contraseña invalida";
			}
			
		}
		else{
			return "usuario no encontrado";
		}

		 
		 

	}
	async logout(req,res){
		req.sesion = false;
		
		return "closed sesion";
	}
}
module.exports = UserServices;
