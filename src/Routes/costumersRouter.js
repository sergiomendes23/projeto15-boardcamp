import {getCustomers} from '../Controllers/customersControllers.js'
import { Router } from 'express';

const router = Router();

router.post('/customers');
router.get('/customers', getCustomers);

export default router;