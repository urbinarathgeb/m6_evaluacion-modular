import { ALLOWED_DIMENSIONS, ALLOWED_STATUSES } from '../config/constants.js';

export const validateDimensions = (req, res, next) => {
	const {dimensions} = req.body;
	const ALLOWED_KEYS = Object.keys(ALLOWED_DIMENSIONS);

	if (!dimensions) {
		return res.status(400).json({
			message: 'Faltan dimensiones. Las dimensiones son un dato obligatorio.'
		});
	}

	if (!ALLOWED_KEYS.includes(dimensions)) {
		return res.status(400).json({
			message: 'Dimensión no permitida. Verifica el catálogo.'
		});
	}
	next();
};

export const validateId = (req, res, next) => {
	const {id} = req.params;
	if (isNaN(parseInt(id))) {
		return res.status(400).json({message: 'El ID debe ser un número válido'});
	}
	next();
};

export const validateStatus = (req, res, next) => {
	const {status} = req.body;
	if (!status) {
		return res.status(400).json({message: 'El campo status es obligatorio'});
	}
	if (!ALLOWED_STATUSES.includes(status)) {
		return res.status(400).json({
			message: `Estado no permitido. Los estados válidos son: ${ALLOWED_STATUSES.join(', ')}`
		});
	}
	next();
};