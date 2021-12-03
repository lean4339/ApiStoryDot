const express = require("express");
const router = express.Router();
const ProductServices = require("../services/productsServices");
const service = new ProductServices();
const {
	createSchema,
	updateSchema,
	getSchema,
	deleteSchema,
} = require("../schemas/products.schema");
const validatorHandler = require("../middlewares/validator");

router.get("/", async (req, res) => {
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
		const { name, description, image_url, price } = req.body;
		try {
			if (name) {
				const task = await service.create(name, description, image_url, price);
				res.status(200).json(task);
			}
		} catch (error) {
			res.status(404).json(error);
		}
	}
);

router.get("/:id", validatorHandler(getSchema, "params"), async (req, res) => {
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
	"/:id",
	validatorHandler(getSchema, "params"),
	validatorHandler(updateSchema, "body"),
	async (req, res) => {
		const { id } = req.params;
		const { name,description,image_url,price } = req.body;

		try {
			const product = await service.update(id, name,description,image_url,price);
			res.status(200).json(product);
			
		} catch (error) {
			res.status(404).json({
				message: `id ${id} not found`
			});
		}
	}
);

router.delete(
	"/:id",
	validatorHandler(deleteSchema, "params"),
	async (req, res) => {
		const { id } = req.params;
		try {
			const response = await service.delete(id);
			res.status(200).json({
				mensaje: `se eliminó correctamente el producto con id: ${response}`,
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
