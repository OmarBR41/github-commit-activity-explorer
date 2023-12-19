import { GithubSelectedRepo } from '@/types/github';

import { MOCK_REPO_STATS_RES } from './repoStats';
import { MOCK_SEARCH_REPOS_RES } from './searchRepositories';

export const MOCK_SELECTED_REPOS: GithubSelectedRepo[] = [
  {
    ...MOCK_SEARCH_REPOS_RES.items[0],
    stats: MOCK_REPO_STATS_RES,
    color: '#71b7f8',
  },
];
