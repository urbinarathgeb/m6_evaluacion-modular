import * as stockService from '../services/stock.service.js';

export const getAllStock = async (req, res) => {
	try {
		const stockData = await stockService.getStockData();
		res.status(200).json(stockData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}