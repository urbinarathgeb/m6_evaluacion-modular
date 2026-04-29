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
		res.status(500).json({message: 'Error al procesar el paquete', error: error.message});
	}
}