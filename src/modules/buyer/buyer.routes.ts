
import { Router } from 'express';

import {
    createBuyerController,
    getAllBuyersController,
    getBuyerByIdController,
    updateBuyerController
} from './buyer.controller.js';

const router = Router();

router.get('/', getAllBuyersController);

router.get('/:id', getBuyerByIdController);

router.post('/', createBuyerController);

router.put('/:id', updateBuyerController);

export default router;
