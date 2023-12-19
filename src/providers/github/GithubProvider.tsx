import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';

import { useFetch } from '@/hooks/useFetch';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { GITHUB_API_TOKEN } from '@/lib/constants';
import { ChartData } from '@/types/chart';
import { GithubRepo, GithubRepoResponse, GithubRepoStatsResponse, GithubSelectedRepo } from '@/types/github';

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
  const [selectedRepos, setSelectedRepos] = useLocalStorage<GithubSelectedRepo[]>('selectedRepos', []);
  const [searchResults, setSearchResults] = useState<GithubRepo[] | null>(null);
  const [searchUrl, setSearchUrl] = useState<string | undefined>(undefined);

  const search = useFetch(searchUrl, {
    options: GithubFetchOptions,
    debounce: true,
  });
  const { fetchData: fetchRepoStats } = useFetch(undefined, { options: GithubFetchOptions });

  const [chartData, setChartData] = useLocalStorage<ChartData>('chartData', {});

  useEffect(() => {
    if (!search?.data) {
      return;
    }

    const items = (search?.data as GithubRepoResponse)?.items ?? null;
    setSearchResults(items);
  }, [search?.data]);

  const fetchRepos = (query: string) => {
    if (query === '') {
      closeResults();
      return;
    }

    setSearchUrl(`${SEARCH_REPO_API}?q=${query}`);
  };

  const fetchStats = (repo: GithubRepo) => {
    const url = `${REPO_STATS_API}/${repo.owner.login}/${repo.name}/stats/commit_activity`;

    fetchRepoStats?.(url).then((data) => {
      const stats = data as GithubRepoStatsResponse;
      addRepo({ ...repo, stats, color: randomColor() });
    });
  };

  const addRepo = (repo: GithubSelectedRepo) => {
    const newRepos = [...selectedRepos, repo];
    setSelectedRepos(newRepos);
    addChartData(repo);
  };

  const closeResults = () => {
    setSearchResults(null);
  };

  const removeRepo = (repoId: number) => {
    const newRepos = selectedRepos.filter((repo) => repo.id !== repoId);
    setSelectedRepos(newRepos);
  };

  const addChartData = (repo: GithubSelectedRepo) => {
    if (Object.keys(repo?.stats).length === 0) {
      return;
    }

    const newChartData = Object.assign({}, chartData);

    repo.stats.forEach(({ total, week }) => {
      const currWeek = newChartData[week];
      console.log(currWeek);
      if (currWeek) {
        newChartData[week][repo.name] = total;
      } else {
        newChartData[week] = {
          [repo.name]: total,
        };
      }
    });
    setChartData(newChartData);
  };

  return (
    <GithubContext.Provider
      value={{
        chartData,
        selectedRepos,
        search: {
          results: searchResults,
          isLoading: search.isLoading,
          error: search.error,
        },
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
