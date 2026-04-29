import { Router } from 'express';
import * as stockController from '../controllers/stock.controller.js';


const router = Router();


router.get('/', stockController.getStockSummary);

export default router;