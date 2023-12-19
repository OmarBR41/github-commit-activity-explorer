import { format, formatDistance, nextMonday, setWeek } from 'date-fns';

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

export const formatTimeDistance = (date: Date) => {
  const today = new Date();

  if (today.getFullYear() !== date.getFullYear()) {
    return format(date, "'on' MMMM dd, yyyy");
  }

  return formatDistance(date, today, { addSuffix: true });
};

export const formatWeek = (week: number) => {
  return format(
    setWeek(nextMonday(new Date()), week, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
    }),
    "'Week of' MMM dd, yyyy"
  );
};
