import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography, Image, Avatar } from 'antd';
import defaultPic from '../../../../../assets/blob.jpg';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { OrderProps } from '../../../../../types/order.type';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';

const OrderInfo = ({ order }: { order: OrderProps | undefined }) => {
  return (
    <div id="order-info" className="px-12 py-5">
      <div id="order" className="py-6">
        <div id="order-summary">
          <Flex id="shop-info" align="center" gap={'small'} className="w-1/3">
          <Avatar size="large" src={order?.userID.avatar} icon={<UserOutlined />} />
            <Typography.Title level={5} className="m-0 inline truncate">
              {`${order?.userID.firstName} ${order?.userID.lastName}`}
            </Typography.Title>
            <Button type="primary" className="px-2 py-1 text-xs">
              <MessageOutlined /> Chat
            </Button>
          </Flex>
        </div>
        <Divider className='mb-0' />
        <div id="order-detail">
          {order?.orderDetailIDs.map((item: OrderDetailProps) => (
            <div id="product-info" className='my-6'>
            <Flex gap={'middle'}>
              <Image width={75} preview={false} alt="" src={item.productID.image[0]} fallback={defaultPic} />
              <div>
                <Typography.Title level={5} className="m-0">
                  {item.productID.name}
                </Typography.Title>
                <Typography.Paragraph className="text-xs">{item.productID.quality}</Typography.Paragraph>
              </div>
            </Flex>
          </div>
          ))}
        </div>
        <Divider className='mt-0' />
        <div></div>
        <div id="total-price">
          <Flex gap={'middle'} vertical>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Total goods price:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base">{order?.total && formattedCurrency(order.total)}</Typography.Paragraph>
            </Flex>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Shipment cost:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base">{order?.shipmentCost && formattedCurrency(order.shipmentCost)}</Typography.Paragraph>
            </Flex>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Total price:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-xl text-blue-700">{(order?.total && order.shipmentCost) && formattedCurrency(order.total + order.shipmentCost)}</Typography.Paragraph>
            </Flex>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Payment method:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base">{order?.paymentMethodID.name}</Typography.Paragraph>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
