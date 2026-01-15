export interface RunningTradeResponse {
  message: string;
  data: TradeData;
}

export interface TradeData {
  is_open_market: boolean;
  running_trade: RunningTrade[];
  is_show_bs: boolean;
  break_time_left_seconds: number;
  date: string; // Format: YYYY-MM-DD
}

export interface RunningTrade {
  id: string;
  time: string; // Format: HH:mm:ss
  action: 'buy' | 'sell'; // Assuming 'sell' is the only other option
  code: string;
  price: string; // Kept as string because input is "474"
  change: string; // Kept as string because input is "+0.85%"
  lot: string; // Kept as string because input includes commas "2,000"
  is_broker_exists: boolean;
  buyer: string;
  seller: string;
  trade_number: string;
  buyer_type: BrokerType;
  seller_type: BrokerType;
  market_board: string;
}

// Helper type for known broker types to enable auto-complete
export type BrokerType =
  | 'BROKER_TYPE_LOCAL'
  | 'BROKER_TYPE_FOREIGN'
  | 'BROKER_TYPE_GOVERNMENT'
  | string; // fallback for unknown types
