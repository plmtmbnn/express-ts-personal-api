import { fetchRunningTrade } from '../clients/trade.client';
import type { RunningTrade } from '../types/trade';

export async function aggregateRunningTrade(
  baseQuery: Omit<Parameters<typeof fetchRunningTrade>[0], 'trade_number'>
): Promise<RunningTrade[]> {
  const result: RunningTrade[] = [];

  let tradeNumber: string | undefined;
  const isContinue = true;

  while (isContinue) {
    const response = await fetchRunningTrade({
      ...baseQuery,
      ...(tradeNumber ? { trade_number: tradeNumber } : {}),
    });

    const trades = response.data.running_trade;

    // STOP 1: empty result
    if (trades.length === 0) break;

    // STOP 2: date mismatch
    if (response.data.date !== baseQuery.date) break;

    result.push(...trades);

    tradeNumber = trades[trades.length - 1].trade_number;
  }

  return result;
}
