import { BellOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Dropdown, Flex, MenuProps } from 'antd';
import { UserProps } from '../../../../../types/user.type';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        My Profile
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        My Orders
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item 
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item 
      </a>
    ),
  },
];

const UserInfoGroup = ({ user }: { user: UserProps }) => {
  return (
    <Flex gap={'large'} justify="center" align="center">
      <Dropdown menu={{ items }}>
        <Flex gap={'small'} align="center">
          <Avatar size="large" icon={<UserOutlined />} />
          <p className="m-0 hidden xl:inline">{(user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.email}</p>
        </Flex>
      </Dropdown>
      <Divider type="vertical" className="m-0" />
      <div className="relative h-fit">
        <ShoppingCartOutlined className="m-0 text-lg" />
        <p className="absolute -right-2 -top-2 m-0 rounded-full bg-blue-500 px-1 text-xs text-white">0</p>
      </div>
      <div className="relative h-fit">
        <BellOutlined className="m-0 text-lg" />
        <p className="absolute -right-2 -top-2 m-0 rounded-full bg-blue-500 px-1 text-xs text-white">0</p>
      </div>
      <Button type="primary" className="hidden px-10 text-base md:inline" href='/store-register'>
        Sell a product
      </Button>
    </Flex>
  );
};

export default UserInfoGroup;
