import {getRentals, postRentals, finishRentals, deleteRentals} from '../Controllers/rentalsControllers.js'
import { Router } from 'express';
import validateRentals from '..//Middlewares/rentalsMiddleware.js'

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', validateRentals, postRentals);
router.post('/rentals/:id/return', finishRentals);
router.delete('/rentals/:id', deleteRentals);


export default router;