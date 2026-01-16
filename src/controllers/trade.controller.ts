import type { NextFunction, Request, Response } from 'express';
import { aggregateHistoricalPrice } from '@/services/historical-price.service';
import { aggregateRunningTrade } from '@/services/running-trade.service';
import { toCsv } from '@/utils/csv';

const fetchRunningTrade = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { date, symbols } = req.query;

    if (!date || !symbols) {
      return res.status(400).json({
        message: 'date and symbols are required',
      });
    }

    const trades = await aggregateRunningTrade({
      sort: 'ASC',
      limit: 1000,
      order_by: 'RUNNING_TRADE_ORDER_BY_TIME',
      symbols: String(symbols),
      date: String(date),
    });

    const csv = toCsv(trades);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="running_trade__${symbols}.csv"`
    );

    res.send(csv);
  } catch (err) {
    next(err);
  }
};

const fetchHistoricalSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { symbol, start_date, end_date } = req.query;

    if (!symbol || !start_date || !end_date) {
      return res.status(400).json({
        message: 'symbol, start_date, end_date are required',
      });
    }

    const trades = await aggregateHistoricalPrice({
      limit: 10,
      symbol: String(symbol),
      start_date: String(start_date),
      end_date: String(end_date),
      page: 1,
      period: 'HS_PERIOD_DAILY',
    });

    const csv = toCsv(trades);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="historical_summary_${symbol}.csv"`
    );

    res.send(csv);
  } catch (err) {
    next(err);
  }
};

export const TradeController = {
  fetchRunningTrade,
  fetchHistoricalSummary,
};
