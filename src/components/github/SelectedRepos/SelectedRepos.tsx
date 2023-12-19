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
  const { removeRepo } = useGithub();
  const { id, name, owner, updated_at, stargazers_count, color, html_url } = repo;

  const updatedAt = new Date(updated_at);
  const lastUpdatedAt = updatedAt.toLocaleString();

  return (
    <div className='RepoItem'>
      <div className='RepoItem-colorTag' style={{ backgroundColor: color }} />

      <a className='RepoItem-name' href={html_url} target='_blank' rel='noreferrer'>
        <span className='RepoItem-owner'>{owner.login} / </span>
        {name}
      </a>

      <div className='RepoItem-bottom'>
        <p className='RepoItem-commits'>
          <Star className='RepoItem-commitsIcon' />
          {stargazers_count}
        </p>

        <p className='RepoItem-lastUpdatedAt'>{lastUpdatedAt}</p>
      </div>

      <Trash2
        className='RepoItem-deleteBtn'
        onClick={() => {
          removeRepo(id);
        }}
      />
    </div>
  );
};
