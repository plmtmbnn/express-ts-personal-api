import { Router } from 'express';
import { TradeController } from '@/controllers/trade.controller.js';

export const tradeRouter: Router = Router();

tradeRouter.get('/running-trade/export', TradeController.fetchRunningTrade);
tradeRouter.get(
  '/historical-summary/export',
  TradeController.fetchHistoricalSummary
);
