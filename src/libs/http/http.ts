import { client } from './http.client';
import { resolveHeaders } from './http.headers';
import type { BaseOptions, HttpBody } from './http.types';

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

  post<T, B extends HttpBody = HttpBody>(
    url: string,
    body: B,
    options?: BaseOptions
  ): Promise<T> {
    return client<T>(url, {
      method: 'POST',
      body: body as any,
      query: options?.query,
      headers: resolveHeaders(body as Record<string, any>, options?.headers),
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  put<T, B extends HttpBody = HttpBody>(
    url: string,
    body: B,
    options?: BaseOptions
  ): Promise<T> {
    return client<T>(url, {
      method: 'PUT',
      body: body as any,
      query: options?.query,
      headers: resolveHeaders(body as Record<string, any>, options?.headers),
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },

  patch<T, B extends HttpBody = HttpBody>(
    url: string,
    body: B,
    options?: BaseOptions
  ): Promise<T> {
    return client<T>(url, {
      method: 'PATCH',
      body: body as any,
      query: options?.query,
      headers: resolveHeaders(body as Record<string, any>, options?.headers),
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT,
    });
  },
};
