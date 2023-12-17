import React from 'react';
import { Search } from 'react-feather';
import './SearchBar.css';

type SearchBarProps = {
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
};

export const SearchBar = ({ placeholder = 'Search...', onChange }: SearchBarProps) => {
  return (
    <div className="SearchBar">
      <input className="SearchBar-input" placeholder={placeholder} onChange={onChange} />
      <div className="SearchBar-icon">
        <Search color="#37374A" />
      </div>
    </div>
  );
};
