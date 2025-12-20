import { isFormData } from './http.utils';

export function resolveHeaders(
  body: unknown,
  customHeaders?: Record<string, string>
): Record<string, string> {
  const headers: Record<string, string> = {
    ...(customHeaders ?? {}),
  };

  if (body && !isFormData(body)) {
    headers['content-type'] = 'application/json';
  }

  return headers;
}
