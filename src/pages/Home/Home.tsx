import { SearchRepos } from '@/components/github/SearchRepos';
import { Logo } from '@/components/ui/Logo';
import './Home.css';

export const Home = () => {
  return (
    <div className="Home">
      <div className="Chart" />

      <div className="Home-sidebar">
        <SearchRepos />
      </div>

      <div className="Home-logo">
        <Logo />
      </div>
    </div>
  );
};
