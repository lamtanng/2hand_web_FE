import { Menu, MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Waiting for review',
    key: '1',
  },
  {
    label: 'My Reivews',
    key: '2',
  },
];

const MyReviews = () => {
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
          <Menu defaultSelectedKeys={['1']} mode="horizontal" items={items} />
      </div>
      <div id="order-list"></div>
    </div>
  );
};

export default MyReviews;
