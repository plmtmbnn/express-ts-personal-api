import { fetchDataFromHeaven } from '@/clients/trade.client.js';
import { ENV_GLOBAL } from '@/config/index.js';
import type {
  HistoricalSummaryResponse,
  HistoricalSummaryResult,
} from '@/types/historical-price.js';

export interface HistoricalSummaryQuery {
  symbol: string;
  period: 'HS_PERIOD_DAILY';
  start_date: string;
  end_date: string;
  limit: number;
  page: number;
}

export async function aggregateHistoricalPrice(
  baseQuery: HistoricalSummaryQuery
): Promise<HistoricalSummaryResult[]> {
  const aggregated: HistoricalSummaryResult[] = [];
  let page: number = 1;
  const limit = baseQuery.limit ?? 50;

  const isContinue = true;

  while (isContinue) {
    const response: HistoricalSummaryResponse = await fetchDataFromHeaven(
      ENV_GLOBAL.TRADE_API_BASE_URL,
      `/company-price-feed/historical/summary/${baseQuery.symbol}`,
      {
        ...baseQuery,
        limit,
        page,
      }
    );

    const result = response.data.result;

    // STOP: empty result
    if (result.length === 0) break;

    // ✅ SKIP value === 0
    const filtered = result.filter((item) => item.value !== 0);

    aggregated.push(...filtered);

    page += 1;
  }

  return aggregated;
}
