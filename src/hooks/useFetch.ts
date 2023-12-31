import { useCallback, useEffect, useState } from 'react';

import { GithubRepoResponse, GithubRepoStatsResponse } from '@/types/github';

import { useDebounce } from './useDebounce';

type FetchData = GithubRepoResponse | GithubRepoStatsResponse;

type DebounceOptions = {
  delay?: number;
};

export type FetchError = Error | string | null;

export type useFetchState = {
  data?: FetchData;
  isLoading: boolean;
  error?: FetchError;
  fetchData: (url: string) => Promise<FetchData>;
};

export type useFetchConfig = {
  options?: RequestInit;
  debounce?: boolean | DebounceOptions;
};

export const useFetch = (initialUrl?: string, config?: useFetchConfig): useFetchState => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  // apply debounce if enabled
  const debouncedUrl = useDebounce(initialUrl, (config?.debounce as DebounceOptions)?.delay);
  const isDebounced = config?.debounce && Boolean(debouncedUrl);

  const [urlToFetch, setUrlToFetch] = useState<string | undefined>(isDebounced ? String(debouncedUrl) : initialUrl);

  const fetchData = useCallback(
    async (newUrl?: string, options?: RequestInit) => {
      const url = newUrl ?? initialUrl;

      if (url === undefined) {
        return;
      }

      // throw error on empty request
      if (url === '') {
        throw new Error("Can't fetch with empty URL");
      }

      setIsLoading(true);

      try {
        const response = await fetch(url, options ?? config?.options);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setData(data);
        return data;
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          return;
        }

        const errMessage = String(err) ?? 'Unknown error while fetching';
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [config?.options]
  );

  useEffect(() => {
    if (!urlToFetch) {
      return;
    }

    void fetchData(urlToFetch);
  }, [urlToFetch]);

  useEffect(() => {
    if (!isDebounced) {
      return;
    }

    setUrlToFetch(String(debouncedUrl));
  }, [config?.debounce, debouncedUrl]);

  return { data, isLoading, error, fetchData };
};
