const express = require("express");
const router = express.Router();
const UserServices = require("../services/userServices");
const service = new UserServices();
const {
	createSchema,
	updateSchema,
	getSchema,
	deleteSchema,
} = require("../schemas/users.schema");
const validatorHandler = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/",verifyToken,async (req, res) => {
	try {
		res.status(200).json(await service.find());
	} catch (error) {
		res.status(404).json(error);
	}
});

router.post(
	"/",
	validatorHandler(createSchema, "body"),
	async (req, res, next) => {
		const { name, username, email,password, image_url } = req.body;
		try {
			if (name) {
				const user = await service.create(name, username,email,password, image_url);
				res.status(200).json(user);
			}
		} catch (error) {
			res.status(404).json(error);
		}
	}
);

router.get("/:id", verifyToken,validatorHandler(getSchema, "params"), async (req, res) => {
	try {
		const { id } = req.params;
		const product = await service.findOne(id);
		if (product) {
			res.status(200).json(product);
		}
		else{
			res.status(404).json({
				mesagge: `id ${id} not found`
			});
		}
	} catch (error) {
		res.status(404).json(error);
	}
});

router.put(
	"/:id",verifyToken,
	validatorHandler(getSchema, "params"),
	validatorHandler(updateSchema, "body"),
	async (req, res) => {
		const { id } = req.params;
		const { name,username,email,password,image_url} = req.body;

		try {
			const user = await service.update(id, name,username,email,password,image_url);
			res.status(200).json(user);
			
		} catch (error) {
			res.status(404).json({
				message: `id ${id} not found`
			});
		}
	}
);

router.delete(
	"/:id",verifyToken,
	validatorHandler(deleteSchema, "params"),
	async (req, res) => {
		const { id } = req.params;
		try {
			const response = await service.delete(id);
			res.status(200).json({
				mensaje: `se eliminó correctamente el usuario con id: ${response}`,
			});
		} catch (error) {
			res.status(404).json({
				message: `id ${id} not found`,
				error : error,
			});
		}
	}
);
router.post("/login",async (req,res)=>{
	const {email,password} = req.body;
	try{
		const token = await service.login(email,password);
		res.status(200).json({
			mensaje: "sesion inciada",
			token: token
		});
	}
	catch(error){
		res.status(404).json({
			mensaje: "hubo un error",
			error: error,
		});
	}
});
router.post("/logout",verifyToken,async(req,res)=>{
	const token = req.headers["token"];
	try{
		const sesion = await service.logout(res,req);
		res.status(200).json({sesion});
	}
	catch(error){
		res.status(404).json({error});
	}



});

module.exports = router;
