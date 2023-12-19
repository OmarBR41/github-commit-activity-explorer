import { GithubRepoStatsResponse } from '@/types/github';

// Example response from GitHub's Statistics API
// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-the-last-year-of-commit-activity
export const MOCK_REPO_STATS_RES: GithubRepoStatsResponse = [
  {
    days: [0, 3, 26, 20, 39, 1, 0],
    total: 89,
    week: 1336280400,
  },
];
