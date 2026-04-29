export const errorHandler = (err, req, res) => {
    console.error(`[Error] ${err.message}`);

    const statusCode = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

export const asyncWrapper = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};