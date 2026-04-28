import { Router } from 'express';
import * as inventoryController from '../controllers/inventory.controller.js';

const router = Router();


router.get('/', inventoryController.getAllInventory);
router.get('/:id', inventoryController.getInventoryById);
// router.post('/', inventoryController)

export default router;