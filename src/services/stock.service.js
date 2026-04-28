import fs from 'fs/promises';
import config from '../config/config.js';


const {dataPath} = config.paths;

export const getStockData = async () => {
	try {
		const data = await fs.readFile(`${dataPath}/stock.json`, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error al leer el archivo de stock:', error);
		throw new Error('No se pudo leer la base de datos de stock');
	}
};

export const setStockData= async (games) => {
	try {
		await fs.writeFile(`${dataPath}/stock.json`, JSON.stringify(games, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error al escribir en el archivo de stock:', error);
		throw new Error('No se pudo guardar en la base de datos de stock');
	}
};