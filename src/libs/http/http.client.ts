import { type $fetch, ofetch } from 'ofetch';
import { HttpClientError } from './http.error';

export const client: ReturnType<typeof $fetch.create> = ofetch.create({
  retry: 0,

  async onResponseError({ response }) {
    throw new HttpClientError(
      response.statusText ?? 'HTTP Error',
      response.status,
      response._data
    );
  },
});
