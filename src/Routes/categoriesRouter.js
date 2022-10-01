import { postCategories, getCategories } from "../Controllers/categoriesControllers.js";
import { Router } from 'express';
import validateCategories from "../Middleware/categoriesMiddleware.js";

const router = Router();

router.post('/categories', postCategories);
router.get('/categories', getCategories);

export default router;