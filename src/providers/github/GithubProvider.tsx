import { useState } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { GITHUB_API_TOKEN } from '@/lib/constants';
import { GithubRepo, GithubRepoResponse, GithubSelectedRepo } from '@/types/github';

import { GithubContext } from './GithubContext';

const SEARCH_REPO_API = 'https://api.github.com/search/repositories';

const GithubFetchOptions = {
  headers: {
    accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: 'Bearer ' + GITHUB_API_TOKEN,
  },
};

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRepos, setSelectedRepos] = useState<GithubSelectedRepo[]>([]);
  const [searchResults, setSearchResults] = useState<GithubRepo[] | null>(null);

  const { fetchData: fetchSearchRepos } = useFetch('', { options: GithubFetchOptions, debounce: true });

  const fetchRepos = (query: string) => {
    const url = `${SEARCH_REPO_API}?q=${query}`;

    fetchSearchRepos(url).then((data) => {
      const items = (data as GithubRepoResponse)?.items ?? null;
      setSearchResults(items);
    });
  };

  return (
    <GithubContext.Provider
      value={{
        selectedRepos,
        searchResults,
        fetchRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
