import { Router } from 'express';
import { helloRouter } from './hello.routes';
import { tradeRouter } from './trade.routes';

const router = Router();

// Register all routes here
router.use('/hello', helloRouter);
router.use('/trade', tradeRouter);

// Add more routers below if needed
// router.use('/users', userRouter);

export default router;
