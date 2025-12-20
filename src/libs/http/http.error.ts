export class HttpClientError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = 'HttpClientError';
    this.statusCode = statusCode;
    this.data = data;
  }
}
