import { Card, Flex, Typography, Tooltip } from 'antd';
import { ReactNode } from 'react';

interface StatisticCardProps {
  title: string;
  icon: ReactNode;
  data: number | string | undefined;
  date: string;
  trend?: number;
  trendIcon?: ReactNode;
  trendColor?: string;
}

const StatisticCard = ({
  title,
  icon,
  data,
  date,
  trend,
  trendIcon,
  trendColor = 'text-green-500',
}: StatisticCardProps) => {
  return (
    <Card
      className="h-full w-full border-0 shadow-md transition-all duration-300 hover:shadow-lg"
      bodyStyle={{ padding: '20px', height: '100%' }}
    >
      <Flex vertical className="h-full" justify="space-between">
        <Flex align="center" className="mb-2">
          <span className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">{icon}</span>
          <Typography.Text strong className="text-base text-gray-700">
            {title}
          </Typography.Text>
        </Flex>

        <div>
          <Typography.Title level={3} className="m-0 text-blue-600">
            {data}
          </Typography.Title>

          <Flex align="center" justify="space-between" className="mt-2">
            <Typography.Text type="secondary" className="text-xs">
              {date}
            </Typography.Text>

            {trend !== undefined && (
              <Tooltip title={`${Math.abs(trend)}% ${trend >= 0 ? 'increase' : 'decrease'} from last period`}>
                <Flex align="center" className={`${trendColor} text-xs font-medium`}>
                  {trendIcon}
                  <span className="ml-1">{Math.abs(trend)}%</span>
                </Flex>
              </Tooltip>
            )}
          </Flex>
        </div>
      </Flex>
    </Card>
  );
};

export default StatisticCard;
