import React from 'react';
import { Search, X } from 'react-feather';

import './SearchBar.css';

type SearchBarProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  value: string;
  handleClear?: () => void;
};

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const { value, handleClear, ...otherProps } = props;
  const shouldShowClearButton = value !== '';

  return (
    <div className='SearchBar'>
      <input ref={ref} className='SearchBar-input' {...otherProps} />
      <div className='SearchBar-icons'>
        <X
          className={shouldShowClearButton ? 'SearchBar-closeIcon' : 'SearchBar-closeIcon--hidden'}
          onClick={handleClear}
        />
        <Search className='SearchBar-searchIcon' />
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export { SearchBar };
