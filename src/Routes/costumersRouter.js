import {getCustomers, getOne, postCustomer, putCustomer} from '../Controllers/customersControllers.js'
import { Router } from 'express';
import validateCustomer from '../Middlewares/costumersMiddleware.js'

const router = Router();

router.post('/customers', validateCustomer, postCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', getOne);
router.put('/customers/:id', validateCustomer, putCustomer);

export default router;