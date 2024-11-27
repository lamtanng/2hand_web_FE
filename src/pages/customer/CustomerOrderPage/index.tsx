import { Tabs, TabsProps } from 'antd';
import useCustomerOrderPage from './useCustomerOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import OrderList from './components/OrderList';

const MyOrders = () => {
  const { profile } = useAccountPage();
  const { orders } = useCustomerOrderPage(profile);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      label: 'All Orders',
      key: '1',
      children: <OrderList orders={orders.reverse()} />,
    },
    {
      label: 'Waiting for confirmation',
      key: '2',
      children: <OrderList orders={orders.reverse()} />,
    },
    {
      label: 'Waiting for delivery',
      key: '3',
      children: <OrderList orders={orders.reverse()} />,
    },
    {
      label: 'Delivered',
      key: '4',
      children: <OrderList orders={orders.reverse()} />,
    },
    {
      label: 'Canceled',
      key: '5',
      children: <OrderList orders={orders.reverse()} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default MyOrders;
