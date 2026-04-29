import fs from 'fs/promises';
import config from '../config/config.js';


const {dataPath} = config.paths;
const ALLOWED_DIMENSIONS = {
	'18x90x3600': {width: 11, height: 34},
	'45×70×3600':{width: 15, height: 14},
	'90×100×3600':{width: 9, height: 8},
	'18×70×3600':{width: 14, height: 34},
	'70×90×3600':{width: 10, height: 10},
	'24×100×3600':{width: 10, height: 26},
	'50×50×3600':{width: 14, height: 18},
	'20×98×3600':{width: 16, height: 20},
	'40×90×3600':{width: 12, height: 14},
	'50×75×3600':{width: 13, height: 12},
	'90×90×3600':{width: 10, height: 8}
};

export const calculateStackData = (body) => {
	const { dimensions, stack_width, stack_height } = body;
	const standard = ALLOWED_DIMENSIONS[dimensions];
	if (!standard) {
		throw new Error('Dimensiones no permitidas');
	}

	const finalWidth = stack_width ?? standard.width ?? 1;
	const finalHeight = stack_height ?? standard.height ?? 1;

	const unitCount = finalWidth * finalHeight;
	const [thickness, broad, length] = dimensions.split('x').map(Number);
	const m3 = (thickness / 1000) * (broad / 1000) * (length / 1000) * unitCount;

	return {
		stack_width: finalWidth,
		stack_height: finalHeight,
		unit_count: unitCount,
		total_cubic_meters: Number(m3.toFixed(2))
	}
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

export const setInventoryData = async (games) => {
	try {
		await fs.writeFile(`${dataPath}/inventory.json`, JSON.stringify(games, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error al escribir en el archivo de inventory:', error);
		throw new Error('No se pudo guardar en la base de datos de inventory');
	}
};