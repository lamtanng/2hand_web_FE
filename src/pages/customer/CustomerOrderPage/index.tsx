import { Tabs, TabsProps } from 'antd';
import useCustomerOrderPage from './useCustomerOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import OrderList from './components/OrderList';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';

const MyOrders = () => {
  const { profile } = useAccountPage();
  const { orders } = useCustomerOrderPage(profile);

  const confirmatingOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Confirmating)
  const pickingOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Picking)
  const deliveringOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Delivering)
  const deliveredOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Delivered)
  const cancelledOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Cancelled)

  const items: TabsProps['items'] = [
    {
      label: 'All Orders',
      key: '1',
      children: <OrderList orders={orders} />,
    },
    {
      label: 'Waiting for confirmation',
      key: '2',
      children: <OrderList orders={confirmatingOrders} />,
    },
    {
      label: 'Waiting for picking',
      key: '3',
      children: <OrderList orders={pickingOrders} />,
    },
    {
      label: 'Waiting for delivery',
      key: '4',
      children: <OrderList orders={deliveringOrders} />,
    },
    {
      label: 'Delivered',
      key: '5',
      children: <OrderList orders={deliveredOrders} />,
    },
    {
      label: 'Cancelled',
      key: '6',
      children: <OrderList orders={cancelledOrders} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} className="px-12 py-5" />
    </div>
  );
};

export default MyOrders;
