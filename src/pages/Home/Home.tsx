import { SearchRepos } from '@/components/github/SearchRepos';
import { Logo } from '@/components/ui/Logo';
import { GithubProvider } from '@/providers/github/GithubProvider';

import './Home.css';

export const Home = () => {
  return (
    <div className='Home'>
      <GithubProvider>
        <div className='Chart' />

        <div className='Home-sidebar'>
          <SearchRepos />
        </div>

        <div className='Home-logo'>
          <Logo />
        </div>
      </GithubProvider>
    </div>
  );
};
