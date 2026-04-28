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
		const stockData = await inventoryService.getInventoryData();
		const stack = stockData.find(stock => stock.id === parseInt(id));

		if (!stack) return res.status(404).json({message: 'Stack no encontrado'});

		res.status(200).json({
			id: stack.id,
			data: stack
		});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};