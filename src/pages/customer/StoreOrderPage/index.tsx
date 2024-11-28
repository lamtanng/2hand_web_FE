import { Tabs, TabsProps } from 'antd';
import useStoreOrderPage from './useStoreOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import OrderList from './components/OrderList';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { sortOrderArray } from '../../../utils/sortOrderArray';

const StoreOrder = () => {
  const { profile } = useAccountPage();
  const { orders } = useStoreOrderPage(profile);

  const confirmatingOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Confirmating);
  const pickingOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Picking);
  const deliveringOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Delivering);
  const deliveredOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Delivered);
  const cancelledOrders = orders.filter((item: OrderProps) => item.orderStageID.name === OrderStage.Cancelled);

  const items: TabsProps['items'] = [
    {
      label: 'All Orders',
      key: '1',
      children: <OrderList orders={sortOrderArray(orders)} />,
    },
    {
      label: 'Waiting for confirmation',
      key: '2',
      children: <OrderList orders={sortOrderArray(confirmatingOrders)} />,
    },
    {
      label: 'Waiting for picking',
      key: '3',
      children: <OrderList orders={sortOrderArray(pickingOrders)} />,
    },
    {
      label: 'Waiting for delivery',
      key: '4',
      children: <OrderList orders={sortOrderArray(deliveringOrders)} />,
    },
    {
      label: 'Delivered',
      key: '5',
      children: <OrderList orders={sortOrderArray(deliveredOrders)} />,
    },
    {
      label: 'Cancelled',
      key: '6',
      children: <OrderList orders={sortOrderArray(cancelledOrders)} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} className="px-12 py-5" />
    </div>
  );
};

export default StoreOrder;
