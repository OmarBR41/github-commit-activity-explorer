import { useRef, useState } from 'react';

import { SearchBar, SearchResults } from '@/components/search';
import { GithubRepo } from '@/types/github';

import { RepoSearchItem } from '../RepoSearchItem';

import './SearchRepos.css';

export const SearchRepos = () => {
  const [results, setResults] = useState<GithubRepo[] | null>(null);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
  };

  return (
    <div className='SearchRepos'>
      <SearchBar ref={inputRef} value={query} onChange={onChange} placeholder='Search a GitHub Repository...' />
      <SearchResults
        results={results}
        renderCustomContent={(item: GithubRepo) => <RepoSearchItem {...(item as GithubRepo)} />}
      />
    </div>
  );
};