import { Router } from 'express';
import { TradeController } from '../controllers/trade.controller';

export const tradeRouter = Router();

tradeRouter.get('/running-trade/export', TradeController.fetchRunningTrade);
