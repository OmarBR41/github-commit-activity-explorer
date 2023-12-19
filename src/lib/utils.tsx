export const formatNumber = (num: number): string => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
};

// A wrapper for "JSON.parse()"" to support "undefined" value
export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
}
