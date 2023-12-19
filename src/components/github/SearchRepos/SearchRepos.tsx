import { useRef, useState } from 'react';

import { SearchBar, SearchResults } from '@/components/search';
import { useGithub } from '@/providers/github/GithubContext';
import { GithubRepo } from '@/types/github';

import { RepoSearchItem } from '../RepoSearchItem';

import './SearchRepos.css';

export const SearchRepos = () => {
  const { searchResults, fetchRepos, closeResults, fetchStats } = useGithub();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    closeResults();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    fetchRepos(newValue);
  };

  const onItemClick = (repo: GithubRepo) => {
    fetchStats(repo);
    handleClear();
  };

  return (
    <div className='SearchRepos'>
      <SearchBar
        ref={inputRef}
        value={query}
        onChange={onChange}
        handleClear={handleClear}
        placeholder='Search a GitHub Repository...'
      />
      <SearchResults
        results={searchResults}
        renderCustomContent={(item: GithubRepo) => <RepoSearchItem {...(item as GithubRepo)} />}
        onItemClick={onItemClick}
      />
    </div>
  );
};
