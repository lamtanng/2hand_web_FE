import { Flex, Image, Typography } from 'antd';
import emptyProduct from '../../../../assets/emptyProduct.webp';

const NoProduct = () => {
  return (
    <Flex vertical align="center">
      <Image width={'30%'} alt="" src={emptyProduct} preview={false} />
      <Typography.Title level={4} className="text-blue-600">
        No product is found.
      </Typography.Title>
      <Typography.Paragraph>Please try again by reducing filters or checking your spelling.</Typography.Paragraph>
    </Flex>
  );
};

export default NoProduct;
