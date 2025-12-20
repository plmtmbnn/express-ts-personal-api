import { ofetch } from 'ofetch';
import { HttpClientError } from './http.error';

export const httpClient = ofetch.create({
  retry: 0,

  async onRequest({ options }) {
    options.headers.set('content-type', 'application/json');
    options.headers = {
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
