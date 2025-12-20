import { FetchOptions, ofetch } from 'ofetch';
import { HttpClientError } from './http.error';

const DEFAULT_TIMEOUT = 5000;

export const httpClient = ofetch.create({
  retry: 0,

  async onRequest({ options }) {
    options.headers = {
      'content-type': 'application/json',
      ...(options.headers || {}),
    };
  },

  async onResponseError({ response }) {
    throw new HttpClientError(
      response.statusText || 'HTTP request failed',
      response.status,
      response._data
    );
  },
});
