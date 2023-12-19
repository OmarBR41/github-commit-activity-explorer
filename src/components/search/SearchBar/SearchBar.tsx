import React from 'react';
import { Search } from 'react-feather';

import './SearchBar.css';

type SearchBarProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  value: string;
};

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  return (
    <div className='SearchBar'>
      <input ref={ref} className='SearchBar-input' {...props} />
      <div className='SearchBar-icon'>
        <Search />
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export { SearchBar };
