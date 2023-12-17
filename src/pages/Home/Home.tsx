import { Logo } from '@/components/ui/Logo';
import './Home.css';

export const Home = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <Logo />
        <p>
          Edit <code>src/Home.tsx</code> and save to reload.
        </p>
        <a
          className="Home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
