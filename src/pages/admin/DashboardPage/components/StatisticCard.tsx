import { Card, Flex, Typography, Tooltip, Progress } from 'antd';
import { ReactNode } from 'react';

interface StatisticCardProps {
  title: string;
  icon: ReactNode;
  data: number | string | undefined;
  date: string;
  trend?: number;
  trendIcon?: ReactNode;
  trendColor?: string;
  progressPercent?: number;
  progressColor?: string;
  onClick?: () => void;
}

const StatisticCard = ({
  title,
  icon,
  data,
  date,
  trend,
  trendIcon,
  trendColor = 'text-green-500',
  progressPercent,
  progressColor = '#1890ff',
  onClick,
}: StatisticCardProps) => {
  // Determine background color based on title for visual differentiation
  const getBgColor = () => {
    switch (title.toLowerCase()) {
      case 'users':
        return 'bg-blue-50';
      case 'products':
        return 'bg-purple-50';
      case 'orders':
        return 'bg-orange-50';
      case 'success rate':
        return 'bg-green-50';
      case 'cancel rate':
        return 'bg-red-50';
      case 'stores':
        return 'bg-cyan-50';
      default:
        return 'bg-gray-50';
    }
  };

  // Determine icon background color
  const getIconBgColor = () => {
    switch (title.toLowerCase()) {
      case 'users':
        return 'bg-blue-100 text-blue-600';
      case 'products':
        return 'bg-purple-100 text-purple-600';
      case 'orders':
        return 'bg-orange-100 text-orange-600';
      case 'success rate':
        return 'bg-green-100 text-green-600';
      case 'cancel rate':
        return 'bg-red-100 text-red-600';
      case 'stores':
        return 'bg-cyan-100 text-cyan-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card
      className={`statistic-card h-full w-full border-0 shadow-md transition-all duration-300 hover:shadow-lg ${getBgColor()} ${onClick ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
      bodyStyle={{ padding: '24px', height: '100%' }}
      onClick={onClick}
    >
      <Flex vertical className="h-full" justify="space-between">
        <Flex align="center" className="mb-4">
          <span
            className={`icon-container mr-3 flex h-12 w-12 items-center justify-center rounded-lg ${getIconBgColor()}`}
          >
            {icon}
          </span>
          <Typography.Text strong className="text-lg text-gray-700">
            {title}
          </Typography.Text>
        </Flex>

        <div>
          <Typography.Title level={3} className="m-0 mb-2">
            {data}
          </Typography.Title>

          {progressPercent !== undefined && (
            <div className="mb-3 mt-2">
              <Progress percent={progressPercent} size="small" strokeColor={progressColor} showInfo={false} />
            </div>
          )}

          <Flex align="center" justify="space-between" className="mt-3">
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
