import { httpClient } from './http.client';
import type { BaseOptions } from './http.types';

const DEFAULT_TIMEOUT = 5000;

export const http = {
  get<T>(url: string, options?: BaseOptions): Promise<T> {
    return httpClient<T>(url, {
      method: 'GET',
      query: options?.query,
      headers: options?.headers,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  delete<T>(url: string, options?: BaseOptions): Promise<T> {
    return httpClient<T>(url, {
      method: 'DELETE',
      query: options?.query,
      headers: options?.headers,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  post<T, Body>(url: string, body: Body, options?: BaseOptions): Promise<T> {
    return httpClient<T>(url, {
      method: 'POST',
      body,
      query: options?.query,
      headers: options?.headers,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  put<T, Body>(url: string, body: Body, options?: BaseOptions): Promise<T> {
    return httpClient<T>(url, {
      method: 'PUT',
      body,
      query: options?.query,
      headers: options?.headers,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  patch<T, Body>(url: string, body: Body, options?: BaseOptions): Promise<T> {
    return httpClient<T>(url, {
      method: 'PATCH',
      body,
      query: options?.query,
      headers: options?.headers,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },
};
