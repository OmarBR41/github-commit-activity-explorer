import { useState } from 'react';
import randomColor from 'randomcolor';

import { useFetch } from '@/hooks/useFetch';
import { GITHUB_API_TOKEN } from '@/lib/constants';
import {
  GithubRepo,
  GithubRepoResponse,
  GithubRepoStats,
  GithubRepoStatsResponse,
  GithubSelectedRepo,
} from '@/types/github';

import { GithubContext } from './GithubContext';

const SEARCH_REPO_API = 'https://api.github.com/search/repositories';
const REPO_STATS_API = 'https://api.github.com/repos';

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
  const { fetchData: fetchRepoStats } = useFetch('', { options: GithubFetchOptions });

  const fetchRepos = (query: string) => {
    const url = `${SEARCH_REPO_API}?q=${query}`;

    fetchSearchRepos(url).then((data) => {
      const items = (data as GithubRepoResponse)?.items ?? null;
      setSearchResults(items);
    });
  };

  const fetchStats = (repo: GithubRepo) => {
    const url = `${REPO_STATS_API}/${repo.owner.login}/${repo.name}/stats/commit_activity`;

    fetchRepoStats(url).then((data) => {
      const stats = data as GithubRepoStatsResponse;
      const totalCommits = stats.reduce((acc: number, curr: GithubRepoStats) => acc + curr.total, 0);
      addRepo({ ...repo, stats, totalCommits, color: randomColor() });
    });
  };

  const addRepo = (repo: GithubSelectedRepo) => {
    setSelectedRepos((prevRepos) => [...prevRepos, repo]);
  };

  return (
    <GithubContext.Provider
      value={{
        selectedRepos,
        searchResults,
        fetchRepos,
        fetchStats,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
