import { Tabs, TabsProps } from 'antd';
import useCustomerOrderPage from './useCustomerOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import OrderList from '../../../components/elements/Lists/OrderList';

const MyOrders = () => {
  const { profile } = useAccountPage();
  const { orders, setStages, setPage, total, isLoading, page } = useCustomerOrderPage(profile);

  const onChange = (key: string) => {
    const stage = key ? [key] : [];
    setStages(stage);
    setPage(1);
  };
  const items: TabsProps['items'] = [
    {
      label: 'All Orders',
      key: '',
      children: <OrderList orders={orders} setPage={setPage} total={total} isLoading={isLoading} page={page} />,
    },
    {
      label: 'Waiting for confirmation',
      key: OrderStage.Confirmating,
      children: <OrderList orders={orders} setPage={setPage} total={total} isLoading={isLoading} page={page} />,
    },
    {
      label: 'Waiting for picking',
      key: OrderStage.Picking,
      children: <OrderList orders={orders} setPage={setPage} total={total} isLoading={isLoading} page={page} />,
    },
    {
      label: 'Waiting for delivery',
      key: OrderStage.Delivering,
      children: <OrderList orders={orders} setPage={setPage} total={total} isLoading={isLoading} page={page} />,
    },
    {
      label: 'Delivered',
      key: OrderStage.Delivered,
      children: <OrderList orders={orders} setPage={setPage} total={total} isLoading={isLoading} page={page} />,
    },
    {
      label: 'Cancelled',
      key: OrderStage.Cancelled,
      children: <OrderList orders={orders} setPage={setPage} total={total} isLoading={isLoading} page={page} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default MyOrders;
