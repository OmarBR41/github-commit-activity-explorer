import React from 'react';
import './SearchBar.css';

type SearchBarProps = {
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
};

export const SearchBar = ({ placeholder = 'Search...', onChange }: SearchBarProps) => {
  return (
    <div className="SearchBar">
      <input className="SearchBar-input" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};
