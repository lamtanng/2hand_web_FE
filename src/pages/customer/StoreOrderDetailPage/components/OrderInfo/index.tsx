import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography, Image, Avatar, Rate } from 'antd';
import defaultPic from '../../../../../assets/blob.webp';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { OrderProps } from '../../../../../types/order.type';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';
import dayjs from 'dayjs';

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
        <Divider className="mb-0" />
        <div id="order-detail">
          {order?.orderDetailIDs.map((item: OrderDetailProps) => (
            <div id="product-info" className="my-6">
              <Flex gap={'middle'}>
                <Image width={75} preview={false} alt="" src={item.productID.image[0]} fallback={defaultPic} />
                <div>
                  <Typography.Title level={5} className="m-0">
                    {item.productID.name}
                  </Typography.Title>
                  <Typography.Paragraph className="text-xs">{item.productID.quality}</Typography.Paragraph>
                </div>
              </Flex>
              {item.reviewID && (
                <div id="review">
                  <Divider variant="dashed" />
                  <Flex gap={'large'}>
                    <Flex gap={'middle'} vertical className="w-full">
                      <Flex gap={'small'} vertical>
                        <Rate allowHalf defaultValue={item.reviewID.rate} disabled />
                        <Typography.Paragraph className="m-0 text-gray-500">
                          Review date: {dayjs(item?.reviewID.createdAt?.toString()).format('DD/MM/YYYY')}
                        </Typography.Paragraph>
                      </Flex>
                      <Typography.Paragraph className="m-0 text-base">{item.reviewID.content}</Typography.Paragraph>
                      {item.reviewID.image.map((src: string) => (
                        <Image alt="" src={src} fallback={defaultPic} width={'10%'} />
                      ))}
                      {item.reviewID.replyMessage && (
                        <Flex className="rounded-md bg-blue-50 p-6" vertical gap={'small'}>
                          <Typography.Paragraph className="m-0 text-base font-semibold">
                            Response from seller:
                          </Typography.Paragraph>
                          <Typography.Paragraph className="m-0 text-base">
                            {item.reviewID.replyMessage}
                          </Typography.Paragraph>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                  {/* <Flex justify="end">
                    <Button type="primary" className="h-10 text-base">
                      Response
                    </Button>
                  </Flex> */}
                </div>
              )}
            </div>
          ))}
        </div>
        <Divider className="mt-0" />
        <div></div>
        <div id="total-price">
          <Flex gap={'middle'} vertical>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Total goods price:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base">
                {order?.total && formattedCurrency(order.total)}
              </Typography.Paragraph>
            </Flex>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Shipment cost:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-base">
                {order?.shipmentCost && formattedCurrency(order.shipmentCost)}
              </Typography.Paragraph>
            </Flex>
            <Flex justify="end" align="center" gap={'middle'}>
              <Typography.Paragraph className="m-0">Total price:</Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-xl text-blue-700">
                {order?.total && order.shipmentCost && formattedCurrency(order.total + order.shipmentCost)}
              </Typography.Paragraph>
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
