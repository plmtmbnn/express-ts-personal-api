import { ENV_GLOBAL } from '../config';
import { http } from '../libs/http/http';
import type { RunningTradeResponse } from '../types/trade';

export interface RunningTradeQuery {
  sort: 'ASC' | 'DESC';
  limit: number;
  order_by: string;
  trade_number?: string;
  symbols: string;
  date: string;
}

export const fetchRunningTrade = async (
  query: RunningTradeQuery
): Promise<RunningTradeResponse> => {
  try {
    const OrderTradeResponse: any = await http.get(
      `${ENV_GLOBAL.TRADE_API_BASE_URL}/order-trade/running-trade`,
      {
        headers: {
          Authorization: `Bearer ${ENV_GLOBAL.TRADE_API_TOKEN}`,
        },
        query: query as any,
      }
    );

    return OrderTradeResponse;
  } catch (error) {
    console.log(error);

    throw new Error('error');
  }
};
