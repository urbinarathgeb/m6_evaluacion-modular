import express from 'express';
import config from './config/config.js';
import stockRoutes from './routes/stock.routes.js'

const app = express();
const { port, env } = config;

app.use(express.json());
app.use('/api/stock', stockRoutes);
app.use((req, res) => {
	res.status(404).json({error: 'Ruta no encontrada'});
});


app.listen(port, () => console.log(`Servidor iniciado en modo ${env} en el puerto ${port}, http://localhost:${port}`))