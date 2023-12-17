import { Logo } from '@/components/ui/Logo';
import { SearchBar } from '@/components/search/SearchBar';
import './Home.css';

export const Home = () => {
  return (
    <div className="Home">
      <div className="Chart" />

      <div className="Home-sidebar">
        <SearchBar placeholder="Search a GitHub Repository..." />
      </div>

      <div className="Home-logo">
        <Logo />
      </div>
    </div>
  );
};
