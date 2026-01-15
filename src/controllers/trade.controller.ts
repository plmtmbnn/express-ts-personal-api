import type { NextFunction, Request, Response } from 'express';
import { aggregateRunningTrade } from '../services/trade-aggregate.service';
import { toCsv } from '../utils/csv';

export interface RunningTradeQuery {
  sort: 'ASC' | 'DESC';
  limit: number;
  order_by: string;
  trade_number?: string;
  symbols: string[];
  date: string;
}

const fetchRunningTrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, symbols } = req.query;

    if (!date || !symbols) {
      return res.status(400).json({
        message: 'date and symbols are required',
      });
    }

    const trades = await aggregateRunningTrade({
      sort: 'ASC',
      limit: 100,
      order_by: 'RUNNING_TRADE_ORDER_BY_TIME',
      symbols: String(symbols),
      date: String(date),
    });

    const csv = toCsv(trades);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="running_trade.csv"'
    );

    res.send(csv);
  } catch (err) {
    next(err);
  }
};

export const TradeController = {
  fetchRunningTrade,
};
