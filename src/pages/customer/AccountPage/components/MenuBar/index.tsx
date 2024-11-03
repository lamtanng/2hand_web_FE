import {
  FileTextOutlined,
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Flex, Menu, MenuProps, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, disabled?: boolean): MenuItem {
  return {
    key,
    icon,
    label,
    disabled,
  } as MenuItem;
}

const items: MenuItem[] = [
  {
    key: 'grp',
    type: 'group',
    label: 'My Account',
    children: [
      getItem('Profile', 'profile', <UserOutlined />),
      getItem('My Addresses', 'addresses', <HomeOutlined />),
      getItem('Notifications', 'notifications', <NotificationOutlined />, true),
    ],
  },
  {
    key: 'grp',
    type: 'group',
    label: 'Orders',
    children: [
      getItem('My Orders', 'orders', <FileTextOutlined />),
      getItem('My Reviews', 'reviews', <StarOutlined />),
      getItem('Wishlist', 'wishlist', <HeartOutlined />, true),
    ],
  },
  {
    key: 'grp',
    type: 'group',
    label: 'Settings',
    children: [
      getItem('Change Password', 'changepassword', <SettingOutlined />),
      getItem('Help Center', 'helpcenter', <QuestionCircleOutlined />, true),
      getItem('Log Out', '/', <LogoutOutlined />),
    ],
  },
];

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex align="center" gap={'middle'} className="mb-3 px-3">
        <Avatar icon={<UserOutlined />} size={75} className="shrink-0" />
        <Typography.Title level={4}>Name Name</Typography.Title>
      </Flex>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        className="bg-slate-50 text-base"
        onClick={({ key }) => {
          if (key === '/signin') {
          }
          navigate(key);
        }}
      />
    </>
  );
};

export default MenuBar;