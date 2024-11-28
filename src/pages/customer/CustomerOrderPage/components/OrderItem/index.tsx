import { MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { ConfirmActions, DeliveryActions, ReviewActions } from '../ActionGroup';
import OrderDetail from '../OrderDetail';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import useOrderItem from './useOrderItem';

const OrderItem = ({ order }: { order: OrderProps }) => {
  const { receiveOrder } = useOrderItem(order);
  let actionGroup;
  switch (order.orderStageID.name) {
    case OrderStage.Confirmating:
      actionGroup = <ConfirmActions />;
      break;
    case OrderStage.Picking:
      if (order.orderStageID.orderStageStatusID.status !== OrderStageStatus.RequestToAdmin)
        actionGroup = <ConfirmActions />;
      else actionGroup = null;
      break;
    case OrderStage.Delivering:
      actionGroup = <DeliveryActions receiveOrder={receiveOrder} />;
      break;
    case OrderStage.Delivered:
      actionGroup = <ReviewActions />;
      break;
    default:
      actionGroup = null;
  }

  return (
    <div className="mb-6">
      <div id="order" className="rounded-md bg-slate-50 p-6">
        <div id="order-summary">
          <Flex justify="space-between">
            <Flex id="shop-info" align="center" gap={'small'} className="w-1/3">
              <ShopOutlined />
              <Typography.Title level={5} className="m-0 inline truncate">
                {order.storeID.name}
              </Typography.Title>
              <Button type="primary" className="px-2 py-1 text-xs">
                <MessageOutlined /> Chat
              </Button>
              <Button variant="outlined" className="px-2 py-1 text-xs">
                <ShopOutlined /> Visit shop
              </Button>
            </Flex>
            <div id="order-status">
              <p className="m-0 font-sans text-blue-700">{order?.orderStageID?.name && order.orderStageID.name}</p>
            </div>
          </Flex>
        </div>
        <Divider className="m-0 mt-6" />
        {order.orderDetailIDs.map((item: OrderDetailProps) => (
          <OrderDetail item={item} order={order} />
        ))}
        <Divider />
        <div id="total-price">
          <Flex justify="end" align="center" gap={'middle'}>
            <p className="m-0 font-sans">Total price:</p>
            <p className="m-0 font-sans text-xl text-blue-700">{order.total + order.shipmentCost}</p>
          </Flex>
        </div>
        {actionGroup}
      </div>
    </div>
  );
};

export default OrderItem;
