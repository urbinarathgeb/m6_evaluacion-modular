import * as stockService from '../services/stock.service.js';
import * as inventoryService from '../services/inventory.service.js';

export const getStockSummary = async (req, res) => {
	const inventory = await inventoryService.getInventoryData();

	const summary = inventory.reduce((acc, item) => {
		// Creamos una llave única que combine ambos criterios
		const key = `${item.dimensions}_${item.status}`;

		if (!acc[key]) {
			acc[key] = {
				dimensions: item.dimensions,
				status: item.status,
				total_packages: 0,
				total_m3: 0,
				total_units: 0
			};
		}

		acc[key].total_packages += 1;
		acc[key].total_m3 = Number((acc[key].total_m3 + item.total_cubic_meters).toFixed(3));
		acc[key].total_units += item.unit_count;

		return acc;
	}, {});

	const stockData = Object.values(summary);
	await stockService.setStockData(stockData);

	res.status(200).json(stockData);
};