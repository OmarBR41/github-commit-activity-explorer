import { Line } from 'recharts';

import { Chart } from '@/components/chart/Chart';
import { useGithub } from '@/providers/github';

import './ActivityChart.css';

export const ActivityChart = () => {
  const { chartData, selectedRepos } = useGithub();

  const renderGraphLines = () => {
    return selectedRepos.map(({ name, color }) => (
      <Line key={`chart-line-${name}`} type='monotone' dataKey={name} stroke={color} activeDot={{ r: 8 }} />
    ));
  };

  const data = Object.values(chartData);

  return (
    <div className='ActivityChart'>
      <Chart data={data}>{renderGraphLines()}</Chart>
    </div>
  );
};
