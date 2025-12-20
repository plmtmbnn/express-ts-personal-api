import type { JsonBody } from './http.types';

export function isFormData(body: unknown): body is FormData {
  return typeof FormData !== 'undefined' && body instanceof FormData;
}

export function isJsonBody(body: unknown): body is JsonBody {
  return (
    body === null ||
    typeof body === 'string' ||
    typeof body === 'number' ||
    typeof body === 'boolean' ||
    Array.isArray(body) ||
    typeof body === 'object'
  );
}
