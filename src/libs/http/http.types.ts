export type QueryParams = Record<string, string | number | boolean>;
export type JsonBody =
  | Record<string, any>
  | Array<any>
  | string
  | number
  | boolean
  | null;

export type HttpBody = JsonBody | FormData;

export interface BaseOptions {
  headers?: Record<string, string>;
  query?: QueryParams;
  timeoutMs?: number;
  body?: HttpBody;
}
