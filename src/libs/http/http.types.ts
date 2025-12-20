export type QueryParams = Record<string, string | number | boolean>;

export interface BaseOptions {
  headers?: Record<string, string>;
  query?: QueryParams;
  timeoutMs?: number;
}
