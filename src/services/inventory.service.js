import fs from 'fs/promises';
import config from '../config/config.js';


const {dataPath} = config.paths;
const ALLOWED_DIMENSIONS = {
	'18x90x3600': {width: 11, height: 34},
	'45x70x3600': {width: 15, height: 14},
	'90x100x3600': {width: 9, height: 8},
	'18x70x3600': {width: 14, height: 34},
	'70x90x3600': {width: 10, height: 10},
	'24x100x3600': {width: 10, height: 26},
	'50x50x3600': {width: 14, height: 18},
	'20x98x3600': {width: 16, height: 20},
	'40x90x3600': {width: 12, height: 14},
	'50x75x3600': {width: 13, height: 12},
	'90x90x3600': {width: 10, height: 8}
};

export const calculateStackData = (body) => {
	const {dimensions, stack_width, stack_height} = body;

	const standardStack = ALLOWED_DIMENSIONS[dimensions];

	const {width, height} = standardStack;

	const finalWidth = stack_width ?? width ?? 1;
	const finalHeight = stack_height ?? height ?? 1;

	const unitCount = finalWidth * finalHeight;
	const [thickness, broad, length] = dimensions.split('x').map(Number);
	const m3 = (thickness / 1000) * (broad / 1000) * (length / 1000) * unitCount;
	const currentDate = getCurrentDate()


	return {
		stack_width: finalWidth,
		stack_height: finalHeight,
		unit_count: unitCount,
		total_cubic_meters: Number(m3.toFixed(2)),
		production_date: currentDate,
		status: 'Disponible'
	}
};

export const getCurrentDate = () => {
	const date = new Date();
	const offset = date.getTimezoneOffset() * 60000; // Offset en milisegundos
	const fechaLocal = new Date(date.getTime() - offset);

	return fechaLocal.toISOString().slice(0, -1); // Quitamos la "Z" del final

// Resultado: "2026-04-29T14:30:00.000" (sin el desfase de UTC)

}


export const getInventoryData = async () => {
	try {
		const data = await fs.readFile(`${dataPath}/inventory.json`, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error al leer el archivo de inventario:', error);
		throw new Error('No se pudo leer la base de datos de inventario');
	}
};

export const setInventoryData = async (inventory) => {
	try {
		await fs.writeFile(`${dataPath}/inventory.json`, JSON.stringify(inventory, null, 2), 'utf-8');

	} catch (error) {
		console.error('Error al escribir en el archivo de inventory:', error);
		throw new Error('No se pudo guardar en la base de datos de inventory');
	}
};