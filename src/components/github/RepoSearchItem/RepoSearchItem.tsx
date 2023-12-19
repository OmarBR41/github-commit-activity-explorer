import { GithubRepo } from '@/types/github';

import './RepoSearchItem.css';

export const RepoSearchItem = ({ name, owner }: GithubRepo) => {
  return (
    <p className='RepoSearchItem-text'>
      <span className='RepoSearchItem-owner'>{owner.login} /</span> {name}
    </p>
  );
};
