import { GithubSelectedRepo } from '@/types/github';

import { MOCK_SEARCH_REPOS_RES } from './searchRepositories';

export const MOCK_SELECTED_REPOS: GithubSelectedRepo[] = [
  {
    ...MOCK_SEARCH_REPOS_RES.items[0],
    stats: [
      {
        days: [0, 3, 26, 20, 39, 1, 0],
        total: 89,
        week: 1336280400,
      },
    ],
    totalCommits: 89,
    color: '#71b7f8',
  },
];
