import { Logo } from '@/components/ui/Logo';
import './Home.css';

export const Home = () => {
  return (
    <div className="Home">
      <div className="Chart" />

      <div className="Home-sidebar"></div>

      <div className="Home-logo">
        <Logo />
      </div>
    </div>
  );
};
