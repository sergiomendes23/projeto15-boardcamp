import {getCustomers, getOne, postCustomer} from '../Controllers/customersControllers.js'
import { Router } from 'express';

const router = Router();

router.post('/customers', postCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', getOne);

export default router;