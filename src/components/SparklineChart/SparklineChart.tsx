import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { SparklineDataPoint } from '../../types/crypto';
import { SparklineContainer } from '../../styles/table.styles';

interface SparklineChartProps {
  data: number[];
  isPositive: boolean;
}

const SparklineChart = ({ data, isPositive }: SparklineChartProps) => {
  if (!data || data.length === 0) return null;

  const chartData: SparklineDataPoint[] = data.map((value, index) => ({
    value,
    index,
  }));

  const color = isPositive ? '#22c55e' : '#ef4444';

  return (
    <SparklineContainer>
      <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={40}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </SparklineContainer>
  );
};

export default SparklineChart;
