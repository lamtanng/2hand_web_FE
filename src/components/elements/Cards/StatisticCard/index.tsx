import { Flex, Skeleton, Typography, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './StatisticCard.css';

// Helper function to determine icon class based on label
const getIconClass = (label: string): string => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('product')) return 'icon-products';
  if (lowerLabel.includes('order') && !lowerLabel.includes('rate')) return 'icon-orders';
  if (lowerLabel.includes('revenue')) return 'icon-revenue';
  if (lowerLabel.includes('success')) return 'icon-success-rate';
  if (lowerLabel.includes('cancel')) return 'icon-cancel-rate';
  return '';
};

// Helper function to generate trend data (mock)
const generateTrendData = (label: string): { value: number; isPositive: boolean } => {
  const lowerLabel = label.toLowerCase();

  if (lowerLabel.includes('product')) return { value: 12.5, isPositive: true };
  if (lowerLabel.includes('order') && !lowerLabel.includes('rate')) return { value: 8.7, isPositive: true };
  if (lowerLabel.includes('revenue')) return { value: 15.2, isPositive: true };
  if (lowerLabel.includes('success')) return { value: 5.3, isPositive: true };
  if (lowerLabel.includes('cancel')) return { value: 2.1, isPositive: false };

  return { value: 0, isPositive: true };
};

const StatisticCard = ({
  label,
  data,
  date,
  icon,
  isLoading,
  link,
}: {
  label: string;
  data: any;
  date: Date;
  icon: any;
  isLoading: boolean;
  link: string;
}) => {
  const iconClass = getIconClass(label);
  const trend = generateTrendData(label);

  return (
    <Link to={link} className="statistic-card">
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <>
          <div className="card-header">
            <div className={`card-icon ${iconClass}`}>{icon}</div>
            <span className="card-label">{label}</span>
          </div>

          <div className="card-value">{data}</div>

          <div className="card-footer">
            <div className="card-date">
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>

            {trend.value > 0 && (
              <Tooltip title={`${trend.value}% ${trend.isPositive ? 'increase' : 'decrease'} from last period`}>
                <div className={`card-trend ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  <span>{trend.value}%</span>
                </div>
              </Tooltip>
            )}
          </div>
        </>
      )}
    </Link>
  );
};

export default StatisticCard;
