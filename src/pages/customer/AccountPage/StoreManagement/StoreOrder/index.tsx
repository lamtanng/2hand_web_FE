import { Tabs, TabsProps } from 'antd';
import OrderList from '../../../../../components/elements/Lists/OrderList';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    label: 'All Orders',
    key: '1',
    children: <OrderList />,
  },
  {
    label: 'Waiting for confirmation',
    key: '2',
    children: <OrderList />,
  },
  {
    label: 'Waiting for shipping',
    key: '3',
    children: <OrderList />,
  },
  {
    key: '4',
    label: 'Waiting for delivery',
    children: <OrderList />,
  },
  {
    key: '5',
    label: 'Completed Orders',
    children: <OrderList />,
  },
  {
    key: '6',
    label: 'Canceled Orders',
    children: <OrderList />,
  },
];

const StoreOrder = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="px-12 py-5" />
    </div>
  );
};

export default StoreOrder;
