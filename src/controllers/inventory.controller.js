import * as inventoryService from '../services/inventory.service.js';

export const getAllInventory = async (req, res) => {
	try {
		const stockData = await inventoryService.getInventoryData();
		res.status(200).json(stockData);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}

export const getInventoryById = async (req, res) => {
	try {
		const {id} = req.params;
		const inventoryData = await inventoryService.getInventoryData();
		const stack = inventoryData.find(stock => stock.id === parseInt(id));

		if (!stack) return res.status(404).json({message: 'Stack no encontrado'});

		res.status(200).json({
			id: stack.id,
			data: stack
		});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

export const createStack = async (req, res) => {
	try {
		const {dimensions} = req.body

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

		res.status(201).json({
			message: 'Paquete ingresado correctamente',
			data: newStack
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al procesar el paquete',
			error: error.message
		});
	}
};

export const deleteStack = async (req, res) => {
	try {

		const {id} = req.params;
		const inventoryData = await inventoryService.getInventoryData();
		const stackToDelete = inventoryData.find(stock => stock.id === parseInt(id));

		if (!stackToDelete) {
			return res.status(404).json({message: 'Stack no encontrado'});
		}

		const filteredInventory = inventoryData.filter(stack => stack.id !== stackToDelete.id)
		await inventoryService.setInventoryData(filteredInventory);

		res.status(200).json({
			message: 'Stack eliminado correctamente',
			'deleted-stack': stackToDelete,
			'current-inventory': filteredInventory
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al eliminar el stack',
			error: error.message
		});
	}
}

export const updateStackStatus = async (req, res) => {
	try {
		const {id} = req.params;
		const {status} = req.body;
		const inventoryData = await inventoryService.getInventoryData();
		const stackToUpdate = inventoryData.find(stock => stock.id === parseInt(id));

		if (!stackToUpdate) {
			return res.status(404).json({message: 'Stack no encontrado'});
		}

		if (stackToUpdate.status === status) {
			return res.status(400).json({message: `El estado del stack ${id} ya es ${status}`});
		}

		inventoryData.find(stack => stack.id === parseInt(id)).status = status;
		await inventoryService.setInventoryData(inventoryData);

		res.status(200).json({
			message: `Estado del stack con id ${id} actualizado a ${status}` ,
			'data-updated': stackToUpdate
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al actualizar el estado del stack',
			error: error.message
		});
	}
}