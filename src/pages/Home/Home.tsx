import { MOCK_SEARCH_REPOS_RES } from '@/__mock__/searchRepositories';

import { Logo } from '@/components/ui/Logo';
import { SearchResults } from '@/components/search';
import { SearchBar } from '@/components/search/SearchBar';
import { RepoSearchItem } from '@/components/github/RepoSearchItem';

import { GithubRepo } from '@/types/github';

import './Home.css';

export const Home = () => {
  return (
    <div className="Home">
      <div className="Chart" />

      <div className="Home-sidebar">
        <div className="SearchRepositories">
          <SearchBar placeholder="Search a GitHub Repository..." />
          <SearchResults
            results={MOCK_SEARCH_REPOS_RES.items}
            renderCustomContent={(item: GithubRepo) => <RepoSearchItem {...(item as GithubRepo)} />}
          />
        </div>
      </div>

      <div className="Home-logo">
        <Logo />
      </div>
    </div>
  );
};
