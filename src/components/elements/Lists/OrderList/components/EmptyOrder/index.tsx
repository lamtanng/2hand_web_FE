import { Flex, Image, Typography } from 'antd';
import emptyOrder from '../../../../../../assets/emptyOrder.png'

const EmptyOrder = () => {
  return (
    <Flex vertical justify="center" align="center" gap={'small'} className="py-10">
      <Image width={'30%'} alt="" src={emptyOrder} preview={false} />
      <Typography.Title level={5} className="m-0 text-blue-600">
        No order is found.
      </Typography.Title>
    </Flex>
  );
};

export default EmptyOrder;
