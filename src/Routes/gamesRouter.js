import { postGames, getGames } from '../Controllers/gamesControllers.js';
import validateGames from '../Middlewares/gamesMiddleware.js';
import { Router } from 'express';

const router = Router();

router.post('/games', validateGames, postGames);
router.get('/games', getGames);

export default router;