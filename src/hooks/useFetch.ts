import { useCallback, useEffect, useState } from 'react';

import { GithubRepoResponse } from '@/types/github';

type FetchData = GithubRepoResponse;

export type useFetchState = {
  data?: FetchData;
  isLoading: boolean;
  error?: Error | string | null;
  fetchData: (url: string) => Promise<FetchData>;
};

export type useFetchConfig = {
  options?: RequestInit;
};

export const useFetch = (initialUrl: string, config?: useFetchConfig): useFetchState => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  const fetchData = useCallback(
    async (newUrl?: string, options?: RequestInit) => {
      const url = newUrl ?? initialUrl;

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
      }
    },
    [config?.options]
  );

  useEffect(() => {
    if (!initialUrl) {
      return;
    }

    fetchData(initialUrl).catch((err) => console.error(err));
  }, [fetchData, initialUrl]);

  return { data, isLoading, error, fetchData };
};
