import { Router } from 'express';
import * as stockController from '../controllers/stock.controller.js';

const router = Router();


router.get('/', stockController.getAllStock);
router.get('/:id', stockController.getStockById);

export default router;