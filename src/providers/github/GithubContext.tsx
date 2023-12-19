import { createContext, useContext } from 'react';

import { GithubContextType } from '@/types/github';

export const INITIAL_GITHUB_CTX_VALUE: GithubContextType = {
  chartData: {},
  selectedRepos: [],
  search: {
    results: null,
    isLoading: false,
    error: undefined,
  },
  fetchRepos: () => undefined,
  fetchStats: () => undefined,
  closeResults: () => undefined,
  removeRepo: () => undefined,
};

export const GithubContext = createContext<GithubContextType>(INITIAL_GITHUB_CTX_VALUE);

export const useGithub = () => {
  const githubContext = useContext(GithubContext);

  if (!GithubContext) {
    throw new Error('useGithub has to be used within <GithubContext.Provider>');
  }

  return githubContext;
};
