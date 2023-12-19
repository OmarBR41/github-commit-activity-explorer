import { useEffect, useState } from 'react';
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
  const [searchUrl, setSearchUrl] = useState<string | undefined>(undefined);

  const { data: searchData } = useFetch(searchUrl, { options: GithubFetchOptions, debounce: true });
  const { fetchData: fetchRepoStats } = useFetch(undefined, { options: GithubFetchOptions });

  useEffect(() => {
    if (!searchData) {
      return;
    }

    const items = (searchData as GithubRepoResponse)?.items ?? null;
    setSearchResults(items);
  }, [searchData]);

  const fetchRepos = (query: string) => {
    if (query === '') {
      closeResults();
      return;
    }

    setSearchUrl(`${SEARCH_REPO_API}?q=${query}`);
  };

  const fetchStats = (repo: GithubRepo) => {
    const url = `${REPO_STATS_API}/${repo.owner.login}/${repo.name}/stats/commit_activity`;

    fetchRepoStats(url).then((data) => {
      const stats = data as GithubRepoStatsResponse;
      const totalCommits = Array.isArray(stats)
        ? stats.reduce((acc: number, curr: GithubRepoStats) => acc + Number(curr?.total), 0)
        : 0;
      addRepo({ ...repo, stats, totalCommits, color: randomColor() });
    });
  };

  const addRepo = (repo: GithubSelectedRepo) => {
    setSelectedRepos((prevRepos) => [...prevRepos, repo]);
  };

  const closeResults = () => {
    setSearchResults(null);
  };

  const removeRepo = (repoId: number) => {
    const newRepos = selectedRepos.filter((repo) => repo.id !== repoId);
    setSelectedRepos(newRepos);
  };

  return (
    <GithubContext.Provider
      value={{
        selectedRepos,
        searchResults,
        fetchRepos,
        fetchStats,
        closeResults,
        removeRepo,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
