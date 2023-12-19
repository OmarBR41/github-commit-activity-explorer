import { GitCommit } from 'react-feather';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { formatWeek } from '@/lib/utils';

import './CustomTooltip.css';

export const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (!active) {
    return <></>;
  }

  const week = formatWeek(label);

  return (
    <div className='CustomTooltip'>
      <p className='CustomTooltip-label'>{week}</p>

      {payload &&
        payload.map(({ color, name, value }) => (
          <div key={`tooltip-data-${name}`} className='CustomTooltip-payload'>
            <GitCommit color={color} />
            <span>
              {name}: {value} Commits
            </span>
          </div>
        ))}
    </div>
  );
};
