import { Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

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
  return (
    <Flex vertical className="w-1/4 rounded-xl bg-slate-50 p-8 flex-shrink">
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <Link to={link}>
          <Typography.Paragraph className="m-0 mb-10 text-base">
            {icon} {label}
          </Typography.Paragraph>
          <Flex justify="space-between" align="baseline">
            <Typography.Title level={2} className="m-0">
              {data}
            </Typography.Title>
            <Typography.Paragraph className="m-0">{date.toDateString()}</Typography.Paragraph>
          </Flex>
        </Link>
      )}
    </Flex>
  );
};

export default StatisticCard;
