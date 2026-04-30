import * as inventoryService from '../services/inventory.service.js';
import * as stockService from '../services/stock.service.js';
import { asyncWrapper } from '../middlewares/error.middleware.js';

export const getAllInventory = asyncWrapper(async (req, res) => {
	const stockData = await inventoryService.getInventoryData();
	await stockService.updateStockSummary();
	res.status(200).json(stockData);
});

export const getInventoryById = asyncWrapper(async (req, res) => {
	const {id} = req.params;
	const stack = await inventoryService.findById(id);
	res.status(200).json(stack);
});

export const createStack = asyncWrapper(async (req, res) => {
	const {dimensions} = req.body;
	const inventoryData = await inventoryService.getInventoryData();
	const newId = inventoryData.length > 0 ? Math.max(...inventoryData.map(i => i.id)) + 1 : 1;
	const calculatedStackData = inventoryService.calculateStackData(req.body);

	const newStack = {
		id: newId,
		dimensions,
		...calculatedStackData
	};
	inventoryData.push(newStack);
	await inventoryService.setInventoryData(inventoryData);
	await stockService.updateStockSummary();

	res.status(201).json({
		message: 'Paquete ingresado correctamente',
		data: newStack
	});
});

export const deleteStack = asyncWrapper(async (req, res) => {
	const {id} = req.params;
	const deletedStack = await inventoryService.findById(id);
	const inventoryData = await inventoryService.getInventoryData();
	const filteredInventory = inventoryData.filter(stack => stack.id !== deletedStack.id);
	await inventoryService.setInventoryData(filteredInventory);
	await stockService.updateStockSummary();

	res.status(200).json({
		message: 'Stack eliminado correctamente',
		data: deletedStack
	});
});

export const updateStackStatus = asyncWrapper(async (req, res) => {
	const {id} = req.params;
	const {status} = req.body;
	const inventoryData = await inventoryService.getInventoryData();
	const index = inventoryData.findIndex(stack => stack.id === parseInt(id));

	if (index === -1) {
		const error = new Error('Stack no encontrado');
		error.status = 404;
		throw error;
	}

	if (inventoryData[index].status === status) {
		const error = new Error(`El estado del stack ${id} ya es ${status}`);
		error.status = 400;
		throw error;
	}

	inventoryData[index].status = status;
	await inventoryService.setInventoryData(inventoryData);
	await stockService.updateStockSummary();

	res.status(200).json({
		message: `Estado del stack con id ${id} actualizado a ${status}`,
		'data-updated': inventoryData[index]
	});
});