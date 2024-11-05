import { Flex, Typography } from 'antd';

const NoProduct = () => {
  return (
    <Flex vertical align="center">
      <Typography.Title level={4} className="text-blue-600">
        No product is found
      </Typography.Title>
      <Typography.Paragraph>Please try again by reducing filters or checking your spelling.</Typography.Paragraph>
    </Flex>
  );
};

export default NoProduct;
