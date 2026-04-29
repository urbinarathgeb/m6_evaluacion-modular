import fs from 'fs/promises';
import config from '../config/config.js';
import { ALLOWED_DIMENSIONS } from '../config/constants.js';


const {dataPath} = config.paths;

export const calculateStackData = (body) => {
	const {dimensions, stack_width, stack_height} = body;
	const normalizedDimensions = dimensions.replace(/×/g, 'x');

	const standardStack = ALLOWED_DIMENSIONS[normalizedDimensions];

	const {width, height} = standardStack;

	const finalWidth = stack_width ?? width ?? 1;
	const finalHeight = stack_height ?? height ?? 1;

	const unitCount = finalWidth * finalHeight;
	const [thickness, broad, length] = normalizedDimensions.split('x').map(Number);
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
		if (error.code === 'ENOENT') {
			return [];
		}
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