import { Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'All Orders',
    key: '1',
  },
  {
    label: 'Waiting for confirmation',
    key: '2',
  },
  {
    label: 'Waiting for shipping',
    key: '3',
  },
  {
    key: '4',
    label: 'Waiting for delivery',
  },
  {
    key: '5',
    label: 'Completed Orders',
  },
  {
    key: '6',
    label: 'Canceled Orders',
  },
];


const OrderStatusMenu = () => {
  return (
    <Menu defaultSelectedKeys={['1']} mode="horizontal" items={items} className="text-base" />
  )
}

export default OrderStatusMenu
