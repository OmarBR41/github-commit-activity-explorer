import React, { useState } from 'react';

import { SearchBar, SearchResults } from '@/components/search';

import { GithubRepo } from '@/types/github';

import { RepoSearchItem } from '../RepoSearchItem';
import './SearchRepos.css';

export const SearchRepos = () => {
  const [results, setResults] = useState<GithubRepo[] | null>(null);

  return (
    <div className="SearchRepos">
      <SearchBar placeholder="Search a GitHub Repository..." />
      <SearchResults
        results={results}
        renderCustomContent={(item: GithubRepo) => <RepoSearchItem {...(item as GithubRepo)} />}
      />
    </div>
  );
};
