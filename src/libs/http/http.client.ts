import { ofetch } from 'ofetch';
import { HttpClientError } from './http.error';

export const client = ofetch.create({
  retry: 0,

  async onResponseError({ response }) {
    throw new HttpClientError(
      response.statusText ?? 'HTTP Error',
      response.status,
      response._data
    );
  },
});
