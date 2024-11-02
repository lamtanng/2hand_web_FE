import Order from './components/Order';
import { Tabs, TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    label: 'All Orders',
    key: '1',
    children: <Order/>,
  },
  {
    label: 'Waiting for confirmation',
    key: '2',
    children: <Order/>,
  },
  {
    label: 'Waiting for shipping',
    key: '3',
    children: <Order/>,
  },
  {
    key: '4',
    label: 'Waiting for delivery',
    children: <Order/>,
  },
  {
    key: '5',
    label: 'Completed Orders',
    children: <Order/>,
  },
  {
    key: '6',
    label: 'Canceled Orders',
    children: <Order/>,
  },
];

const MyOrders = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default MyOrders;
