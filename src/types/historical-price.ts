export interface HistoricalSummaryResponse {
  message: string;
  data: HistoricalSummaryData;
}

export interface HistoricalSummaryData {
  result: HistoricalSummaryResult[];
  paginate: Pagination;
}

export interface HistoricalSummaryResult {
  date: string; // Format: YYYY-MM-DD
  close: number;
  change: number;
  value: number; // Total transaction value
  volume: number; // Total shares traded
  frequency: number; // Total number of trades
  foreign_buy: number;
  foreign_sell: number;
  net_foreign: number;
  open: number;
  high: number;
  low: number;
  average: number;
  change_percentage: number;
}

export interface Pagination {
  next_page: string | null; // Use string based on the JSON "2", null if last page
}
