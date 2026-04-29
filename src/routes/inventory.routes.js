import { Router } from 'express';
import * as inventoryController from '../controllers/inventory.controller.js';
import * as val from '../middlewares/inventory.middleware.js';

const router = Router();


router.get('/', inventoryController.getAllInventory);
router.get('/:id', inventoryController.getInventoryById);
router.post('/', val.validateDimensions, inventoryController.createStack);
router.patch('/:id/status', inventoryController.updateStackStatus)
router.delete('/:id', inventoryController.deleteStack);

export default router;