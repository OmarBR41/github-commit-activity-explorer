import { ActivityChart, SearchRepos, SelectedRepos } from '@/components/github';
import { Logo } from '@/components/ui/Logo';
import { GithubProvider } from '@/providers/github/GithubProvider';

import './Home.css';

export const Home = () => {
  return (
    <div className='Home'>
      <GithubProvider>
        <ActivityChart />

        <div className='Home-sidebar'>
          <SearchRepos />
          <SelectedRepos />
        </div>

        <div className='Home-logo'>
          <Logo />
        </div>
      </GithubProvider>
    </div>
  );
};
