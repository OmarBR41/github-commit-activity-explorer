import { SearchResult } from '@/types/search';

import './SearchResults.css';

type SearchResultsProps = {
  results?: SearchResult[] | null;
  renderCustomContent?: (item: SearchResult) => JSX.Element;
  onItemClick?: (item: SearchResult) => void;
};

export const SearchResults = ({ results, renderCustomContent, onItemClick }: SearchResultsProps) => {
  if (!results) {
    return <></>;
  }

  const isEmpty = results.length === 0;

  const renderItems = (item: SearchResult, idx: number) => {
    const itemId = item?.id ?? idx;
    const itemText = item?.name ?? item?.id ?? JSON.stringify(item);

    return (
      <li key={`search_result_${itemId}`} className='SearchItem' onClick={() => onItemClick?.(item)}>
        {renderCustomContent?.(item) ?? <p>{itemText}</p>}
      </li>
    );
  };

  return (
    <ul className='SearchResults'>
      {isEmpty && <p className='SearchResults-empty'>No repositories found, try with another query</p>}

      {!isEmpty && results.map(renderItems)}
    </ul>
  );
};
