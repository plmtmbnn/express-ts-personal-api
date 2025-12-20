import { client } from './http.client';
import { resolveHeaders } from './http.headers';
import { type BaseOptions, HttpBody } from './http.types';

const DEFAULT_TIMEOUT = 5000;

export const http = {
  get<T>(url: string, options?: BaseOptions): Promise<T> {
    return client<T>(url, {
      method: 'GET',
      query: options?.query,
      headers: options?.headers,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  post<T, HttpBody>(
    url: string,
    body: Body,
    options?: BaseOptions
  ): Promise<T> {
    return client<T>(url, {
      method: 'POST',
      body,
      query: options?.query,
      headers: resolveHeaders(body, options?.headers),
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  put<T, HttpBody>(url: string, body: Body, options?: BaseOptions): Promise<T> {
    return client<T>(url, {
      method: 'PUT',
      body,
      query: options?.query,
      headers: resolveHeaders(body, options?.headers),
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  patch<T, HttpBody>(
    url: string,
    body: Body,
    options?: BaseOptions
  ): Promise<T> {
    return client<T>(url, {
      method: 'PATCH',
      body,
      query: options?.query,
      headers: resolveHeaders(body, options?.headers),
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },
};
