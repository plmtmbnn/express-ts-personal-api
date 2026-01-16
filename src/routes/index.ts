import { Router } from 'express';
import { tradeRouter } from './trade.routes';

const router: Router = Router();

// Register all routes here
router.use('/trade', tradeRouter);

export default router;
