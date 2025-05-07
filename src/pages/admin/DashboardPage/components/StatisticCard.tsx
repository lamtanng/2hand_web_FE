import { Flex, Typography } from 'antd';

const StatisticCard = ({
  title,
  icon,
  data,
  date,
}: {
  title: string;
  icon: React.ReactNode;
  data: number | string | undefined;
  date: string;
}) => {
  return (
    <Flex vertical className="w-[18%] gap-4 rounded-xl bg-white p-8 shadow-sm">
      <Typography.Paragraph>
        {icon} {title}
      </Typography.Paragraph>
      {/* <Flex justify="space-between" align="baseline"> */}
        <Typography.Title className="m-0 text-blue-600">{data}</Typography.Title>
        <Typography.Paragraph className="m-0">{date}</Typography.Paragraph>
      {/* </Flex> */}
    </Flex>
  );
};

export default StatisticCard;
