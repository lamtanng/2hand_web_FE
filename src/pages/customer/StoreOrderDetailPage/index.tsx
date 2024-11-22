import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import OrderInfo from './components/OrderInfo';
import useAccountPage from '../AccountPage/useAccountPage';
import useStoreOrderDetailPage from './userStoreOrderDetailPage';

const StoreOrderDetail = () => {
  const {profile} = useAccountPage();
  const {order} = useStoreOrderDetailPage(profile);
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
            <Typography.Paragraph className="m-0 text-base">Order ID: {order?._id}</Typography.Paragraph>
            <Divider type="vertical" className="m-0" />
            <Typography.Paragraph className="m-0 text-base text-blue-500">{order?.orderStatusID.name}</Typography.Paragraph>
          </Flex>
        </Flex>
      </div>
      <Divider className="m-0" />
      <OrderInfo order={order} />
    </div>
  );
};

export default StoreOrderDetail;
