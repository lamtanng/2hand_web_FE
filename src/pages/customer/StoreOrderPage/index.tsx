import { Tabs, TabsProps } from 'antd';
import useStoreOrderPage from './useStoreOrderPage';
import useAccountPage from '../AccountPage/useAccountPage';
import OrderList from './components/OrderList';


const StoreOrder = () => {
  const {profile} = useAccountPage();
  const {orders} = useStoreOrderPage(profile)

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

export default StoreOrder;
