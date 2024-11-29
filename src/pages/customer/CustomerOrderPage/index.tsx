import { Tabs, TabsProps } from 'antd';
import useCustomerOrderPage from './useCustomerOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import OrderList from './components/OrderList';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { sortOrderArray } from '../../../utils/sortOrderArray';

const MyOrders = () => {
  const { profile } = useAccountPage();
  const { orders } = useCustomerOrderPage(profile);

  const confirmatingOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Confirmating);
  const pickingOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Picking);
  const deliveringOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Delivering);
  const deliveredOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Delivered);
  const cancelledOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Cancelled);

  const items: TabsProps['items'] = [
    {
      label: 'All Orders',
      key: '1',
      children: <OrderList orders={sortOrderArray(orders).reverse()} />,
    },
    {
      label: 'Waiting for confirmation',
      key: OrderStage.Confirmating,
      children: <OrderList orders={sortOrderArray(confirmatingOrders).reverse()} />,
    },
    {
      label: 'Waiting for picking',
      key: OrderStage.Picking,
      children: <OrderList orders={sortOrderArray(pickingOrders).reverse()} />,
    },
    {
      label: 'Waiting for delivery',
      key: OrderStage.Delivering,
      children: <OrderList orders={sortOrderArray(deliveringOrders).reverse()} />,
    },
    {
      label: 'Delivered',
      key: OrderStage.Delivered,
      children: <OrderList orders={sortOrderArray(deliveredOrders).reverse()} />,
    },
    {
      label: 'Cancelled',
      key: OrderStage.Cancelled,
      children: <OrderList orders={sortOrderArray(cancelledOrders).reverse()} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} className="px-12 py-5" />
    </div>
  );
};

export default MyOrders;
