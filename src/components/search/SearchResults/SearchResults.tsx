import React from 'react';
import './SearchResults.css';

type SearchResultsProps = {
  results?: any[] | null;
  renderCustomContent?: (item: any) => JSX.Element;
};

export const SearchResults = ({ results, renderCustomContent }: SearchResultsProps) => {
  if (!results) {
    return <></>;
  }

  const isEmpty = results.length === 0;

  const renderItems = (item: any, idx: number) => {
    const itemId = item?.id ?? idx;
    const itemText = item?.name ?? item?.id ?? JSON.stringify(item);

    return (
      <li key={`search_result_${itemId}`} className="SearchItem">
        {renderCustomContent?.(item) ?? <p>{itemText}</p>}
      </li>
    );
  };

  return (
    <ul className="SearchResults">
      {isEmpty && (
        <p className="SearchResults-empty">No repositories found, try with another query</p>
      )}

      {!isEmpty && results.map(renderItems)}
    </ul>
  );
};
