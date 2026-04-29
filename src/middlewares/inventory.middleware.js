export const validateDimensions = (req, res, next) => {
	const {dimensions} = req.body;
	const ALLOWED_KEYS = [
		'18x90x3600',
		'45×70×3600',
		'90×100×3600',
		'18×70×3600',
		'70×90×3600',
		'24×100×3600',
		'50×50×3600',
		'20×98×3600',
		'40×90×3600',
		'50×75×3600',
		'90×90×3600'
	]

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