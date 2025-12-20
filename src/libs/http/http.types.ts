export type QueryParams = Record<string, string | number | boolean>;
type HttpBody =
  | Record<string, any>
  | Array<any>
  | string
  | number
  | boolean
  | null;

export interface BaseOptions {
  headers?: Record<string, string>;
  query?: QueryParams;
  timeoutMs?: number;
  body?: HttpBody;
}
