const express = require("express");
const router = express.Router();
const CompraServices = require("../services/comprasServices");
const service = new CompraServices();
const {
	createSchema,
	updateSchema,
	getSchema,
	deleteSchema,
} = require("../schemas/compras.Schema");
const validatorHandler = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/",verifyToken, async (req, res) => {
	try {
		res.status(200).json(await service.find());
	} catch (error) {
		res.status(404).json(error);
	}
});

router.post(
	"/",verifyToken,
	validatorHandler(createSchema, "body"),
	async (req, res, next) => {
		const { idUser } = req.body;
		try {
			if (idUser) {
				const task = await service.create(idUser);
				res.status(200).json(task);
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
		const { idUser } = req.body;

		try {
			const product = await service.update(idUser);
			res.status(200).json(product);
			
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
				mensaje: `se eliminó correctamente la compra con id: ${response}`,
			});
		} catch (error) {
			res.status(404).json({
				message: `id ${id} not found`,
				error : error,
			});
		}
	}
);

module.exports = router;
