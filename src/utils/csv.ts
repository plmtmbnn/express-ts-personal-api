export function toCsv<T extends Record<string, any>>(data: T[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);

  const rows = data.map((row) =>
    headers
      .map((h) => `"${String(row[h] ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
