export function toCsv<T extends Record<string, any>>(data: T[]): string {
  if (!data || data.length === 0) return '';

  const firstRow = data[0];
  if (!firstRow) return '';

  const headers = Object.keys(firstRow);

  const rows = data.map((row) =>
    headers
      .map((h) => `"${String(row[h] ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
