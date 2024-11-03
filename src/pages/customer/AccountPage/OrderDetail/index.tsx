import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import OrderInfo from './components/OrderInfo';

const OrderDetail = () => {
  const navigate = useNavigate();
  return (
    <div id="container">
      <div id="brief" className="px-12 py-5">
        <Flex align="center" justify="space-between">
          <Button
            variant="text"
            color="default"
            className="p-0 hover:bg-transparent"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined /> Back
          </Button>
          <Flex gap={'middle'}>
            <Typography.Paragraph className="m-0 text-base">Order ID:</Typography.Paragraph>
            <Divider type="vertical" className="m-0" />
            <Typography.Paragraph className="m-0 text-base text-blue-500">Order Status</Typography.Paragraph>
          </Flex>
        </Flex>
      </div>
      <Divider className="m-0" />
      <div className="rounded-md bg-blue-50">
        <Flex className="px-12 py-5" align="center" justify="space-between">
          <Typography.Paragraph className="m-0">Thank you for shopping with us!</Typography.Paragraph>
          <Button type="primary" className="px-10 py-5 text-base">
            Rebuy
          </Button>
        </Flex>
        <Divider variant="dashed" className="m-0" />
        <Flex className="px-12 py-5" justify="end">
          <Button variant="outlined" color="primary" className="px-10 py-5 text-base">
            Review
          </Button>
        </Flex>
        <Flex className="px-12 py-5" justify="end">
          <Button variant="outlined" color="primary" className="px-10 py-5 text-base">
            Contact with seller
          </Button>
        </Flex>
      </div>
      <OrderInfo />
    </div>
  );
};

export default OrderDetail;