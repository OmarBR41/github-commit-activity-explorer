import { Spinner } from '@/components/ui/Spinner/Spinner';
import { SearchResult } from '@/types/search';

import './SearchResults.css';

type SearchResultsProps = {
  isLoading?: boolean;
  results?: SearchResult[] | null;
  renderCustomContent?: (item: SearchResult) => JSX.Element;
  onItemClick?: (item: SearchResult) => void;
};

export const SearchResults = ({ isLoading, results, renderCustomContent, onItemClick }: SearchResultsProps) => {
  if (!results && !isLoading) {
    return <></>;
  }

  const isEmpty = results && results.length === 0;

  const renderItems = (item: SearchResult, idx: number) => {
    const itemId = item?.id ?? idx;
    const itemText = item?.name ?? item?.id ?? JSON.stringify(item);

    return (
      <li key={`search_result_${itemId}`} className='SearchItem' onClick={() => onItemClick?.(item)}>
        {renderCustomContent?.(item) ?? <p>{itemText}</p>}
      </li>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='SearchResults-loading'>
          <Spinner />
        </div>
      );
    }

    if (isEmpty) {
      return <p className='SearchResults-empty'>No repositories found, try with another query</p>;
    }

    if (!results?.length) {
      return <></>;
    }

    return <>{results.map(renderItems)}</>;
  };

  return <ul className='SearchResults'>{renderContent()}</ul>;
};
