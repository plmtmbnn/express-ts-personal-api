import { fetchDataFromHeaven } from '@/clients/trade.client';
import { ENV_GLOBAL } from '@/config';
import type { RunningTrade, RunningTradeResponse } from '@/types/running-trade';

export interface RunningTradeQuery {
  sort: 'ASC' | 'DESC';
  limit: number;
  order_by: string;
  trade_number?: string;
  symbols: string;
  date: string;
}

export async function aggregateRunningTrade(
  baseQuery: RunningTradeQuery
): Promise<RunningTrade[]> {
  const result: RunningTrade[] = [];

  let tradeNumber: string | undefined;
  const isContinue = true;

  while (isContinue) {
    const response: RunningTradeResponse = await fetchDataFromHeaven(
      ENV_GLOBAL.TRADE_API_BASE_URL,
      '/order-trade/running-trade',
      {
        ...baseQuery,
        ...(tradeNumber ? { trade_number: tradeNumber } : {}),
      }
    );

    const trades = response.data.running_trade;

    // STOP 1: empty result
    if (trades.length === 0) break;

    // STOP 2: date mismatch
    if (response.data.date !== baseQuery.date) break;

    result.push(...trades);

    if (trades.length > 1 && trades[trades.length - 1]?.trade_number) {
      tradeNumber = trades[trades.length - 1]?.trade_number;
    }
  }

  return result;
}
