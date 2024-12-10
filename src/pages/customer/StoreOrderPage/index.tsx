import { Tabs, TabsProps } from 'antd';
import useStoreOrderPage from './useStoreOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import OrderList from '../../../components/elements/Lists/OrderList';

const StoreOrder = () => {
  const { profile } = useAccountPage();
  const { orders, isLoading, page, setPage, setStages, total } = useStoreOrderPage(profile);

  const onChange = (key: string) => {
    const stage = key ? [key] : [];
    setStages(stage);
    setPage(1);
  };

  const items: TabsProps['items'] = [
    {
      label: 'All Orders',
      key: '',
      children: <OrderList orders={orders} isLoading={isLoading} page={page} setPage={setPage} total={total} />,
    },
    {
      label: 'Waiting for confirmation',
      key: OrderStage.Confirmating,
      children: <OrderList orders={orders} isLoading={isLoading} page={page} setPage={setPage} total={total} />,
    },
    {
      label: 'Waiting for picking',
      key: OrderStage.Picking,
      children: <OrderList orders={orders} isLoading={isLoading} page={page} setPage={setPage} total={total} />,
    },
    {
      label: 'Waiting for delivery',
      key: OrderStage.Delivering,
      children: <OrderList orders={orders} isLoading={isLoading} page={page} setPage={setPage} total={total} />,
    },
    {
      label: 'Delivered',
      key: OrderStage.Delivered,
      children: <OrderList orders={orders} isLoading={isLoading} page={page} setPage={setPage} total={total} />,
    },
    {
      label: 'Cancelled',
      key: OrderStage.Cancelled,
      children: <OrderList orders={orders} isLoading={isLoading} page={page} setPage={setPage} total={total} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default StoreOrder;
