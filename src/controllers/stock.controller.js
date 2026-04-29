import * as stockService from '../services/stock.service.js';
import { asyncWrapper } from '../middlewares/error.middleware.js';

export const getStockSummary = asyncWrapper(async (req, res) => {
	const stockData = await stockService.getStockData();
	res.status(200).json(stockData);
});