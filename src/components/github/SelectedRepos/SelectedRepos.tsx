import { Search, Star, Trash2 } from 'react-feather';

import { useGithub } from '@/providers/github';
import { GithubSelectedRepo } from '@/types/github';

import './SelectedRepos.css';

export const SelectedRepos = () => {
  const { selectedRepos } = useGithub();

  const isEmpty = selectedRepos.length === 0;

  return (
    <div className='SelectedRepos'>
      {isEmpty && (
        <div className='EmptyRepos'>
          <Search className='EmptyRepos-icon' />
          <p>Search for a GitHub repository to populate graph</p>
        </div>
      )}

      {!isEmpty && selectedRepos.map((repo: GithubSelectedRepo) => <RepoItem key={repo.id} repo={repo} />)}
    </div>
  );
};

const RepoItem = ({ repo }: { repo: GithubSelectedRepo }) => {
  const { id, name, owner, updated_at, totalCommits, color } = repo;

  const updatedAt = new Date(updated_at);
  const lastUpdatedAt = updatedAt.toLocaleString();

  return (
    <div className='RepoItem'>
      <div className='RepoItem-colorTag' style={{ backgroundColor: color }} />

      <p className='RepoItem-name'>
        <span className='RepoItem-owner'>{owner.login} / </span>
        {name}
      </p>

      <div className='RepoItem-bottom'>
        <p className='RepoItem-commits'>
          <Star className='RepoItem-commitsIcon' />
          {totalCommits}
        </p>

        <p className='RepoItem-lastUpdatedAt'>{lastUpdatedAt}</p>
      </div>

      <Trash2
        className='RepoItem-deleteBtn'
        onClick={() => {
          alert(id);
        }}
      />
    </div>
  );
};