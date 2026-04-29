import fs from 'fs/promises';
import config from '../config/config.js';
import * as inventoryService from './inventory.service.js';

const {dataPath} = config.paths;

export const getStockData = async () => {
	try {
		const data = await fs.readFile(`${dataPath}/stock.json`, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		if (error.code === 'ENOENT') {
			return [];
		}
		console.error('Error al leer el archivo de stock:', error);
		throw new Error('No se pudo leer la base de datos de stock');
	}
};

export const setStockData = async (stock) => {
	try {
		await fs.writeFile(`${dataPath}/stock.json`, JSON.stringify(stock, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error al escribir en el archivo de stock:', error);
		throw new Error('No se pudo guardar en la base de datos de stock');
	}
};

export const updateStockSummary = async () => {
	const inventory = await inventoryService.getInventoryData();

	const summary = inventory.reduce((acc, item) => {
		const key = `${item.dimensions}_${item.status}_${item.stack_width}_${item.stack_height}`;

		if (!acc[key]) {
			acc[key] = {
				dimensions: item.dimensions,
				status: item.status,
				stack_width: item.stack_width,
				stack_height: item.stack_height,
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
	await setStockData(stockData);
	return stockData;
};