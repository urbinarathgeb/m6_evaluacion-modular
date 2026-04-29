export const validateDimensions = (req, res, next) => {
	const {dimensions} = req.body;
	const ALLOWED_KEYS = [
		'18x90x3600',
		'45x70x3600',
		'90x100x3600',
		'18x70x3600',
		'70x90x3600',
		'24x100x3600',
		'50x50x3600',
		'20x98x3600',
		'40x90x3600',
		'50x75x3600',
		'90x90x3600'
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