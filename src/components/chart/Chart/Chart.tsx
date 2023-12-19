import { Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ChartProps = {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  customTooltip?: JSX.Element;
};

export const Chart = ({ children, data, customTooltip }: ChartProps) => {
  return (
    <ResponsiveContainer width='100%' height='90%'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis />
        <YAxis />
        <Legend />
        <Tooltip content={customTooltip} />

        {children}
      </LineChart>
    </ResponsiveContainer>
  );
};
