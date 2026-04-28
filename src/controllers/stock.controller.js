import * as stockService from '../services/stock.service.js';

export const getAllStock = async (req, res) => {
	try {
		const stockData = await stockService.getStockData();
		res.status(200).json(stockData);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}

export const getStockById = async (req, res) => {
	try {
		const {id} = req.params;
		const stockData = await stockService.getStockData();
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