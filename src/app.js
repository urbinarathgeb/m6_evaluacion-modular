import express from 'express';
import config from './config/config.js';
import inventoryRoutes from './routes/inventory.routes.js'
import stockRoutes from './routes/stock.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
const { port, env } = config;

app.use(express.json());
app.use('/api/inventory', inventoryRoutes);
app.use('/api/stock', stockRoutes)
app.use((req, res) => {
	res.status(404).json({error: 'Ruta no encontrada'});
});

app.use(errorHandler);


app.listen(port, () => console.log(`Servidor iniciado en modo ${env} en el puerto ${port}, http://localhost:${port}`))