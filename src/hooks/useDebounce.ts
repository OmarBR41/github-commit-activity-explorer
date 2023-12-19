import { useEffect, useState } from 'react';

const DEFAULT_DELAY = 500; // ms

type DebouncedValue = unknown;

export const useDebounce = (value: DebouncedValue, delay?: number): DebouncedValue => {
  const [debouncedValue, setDebouncedValue] = useState<DebouncedValue>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || DEFAULT_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
