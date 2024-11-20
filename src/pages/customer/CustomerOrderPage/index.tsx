import { Tabs, TabsProps } from 'antd';
import OrderList from '../../../components/elements/Lists/OrderList';
import useCustomerOrderPage from './useCustomerOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';

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
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default MyOrders;
