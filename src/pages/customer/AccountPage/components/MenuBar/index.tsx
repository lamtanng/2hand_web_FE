import {
  CarryOutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShopOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Flex, Menu, MenuProps, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useAccountPage from '../../useAccountPage';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, disabled?: boolean): MenuItem {
  return {
    key,
    icon,
    label: <Link to={`${key}`}>{label}</Link>,
    disabled,
  } as MenuItem;
}

const MenuBar = () => {
  const { profile } = useAccountPage();
  const isSeller =
    profile?.roleID?.filter((role: string) => role === '670d2db6d696affd52e661c3').length !== 0 ? true : false;

  const items: MenuItem[] = [
    {
      key: 'account',
      label: 'My Account',
      children: [
        getItem('Profile', 'profile', <UserOutlined />),
        getItem('My Addresses', 'addresses', <HomeOutlined />),
        getItem('Notifications', 'notifications', <NotificationOutlined />, true),
      ],
    },
    {
      key: 'purchase',
      label: 'Purchases',
      children: [
        getItem('My Purchases', 'purchases', <FileTextOutlined />),
        getItem('My Reviews', 'reviews', <StarOutlined />),
        getItem('Wishlist', 'wishlist', <HeartOutlined />, true),
      ],
    },
    {
      key: 'store',
      label: 'Store Management',
      children: [
        getItem('Dashboard', 'dashboard', <DashboardOutlined />),
        getItem('Products', 'products', <CarryOutOutlined />),
        getItem('Orders', 'orders', <FileTextOutlined />),
        getItem('Store Reviews', 'store-reviews', <StarOutlined />),
        getItem('Store Profile', 'store-profile', <ShopOutlined />),
      ],
      disabled: !isSeller,
    },
    {
      key: 'setting',
      label: 'Settings',
      children: [
        getItem('Change Password', 'changepassword', <SettingOutlined />),
        getItem('Help Center', 'helpcenter', <QuestionCircleOutlined />, true),
        getItem('Log Out', '/', <LogoutOutlined />),
      ],
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <Flex align="center" gap={'middle'} className="mb-3 px-3">
        <Avatar icon={<UserOutlined />} size={75} className="shrink-0" />
        <Typography.Title level={4}>{`${profile?.firstName} ${profile?.lastName}`}</Typography.Title>
      </Flex>
      <Menu
        defaultSelectedKeys={['profile']}
        defaultOpenKeys={['account', 'purchase', 'setting']}
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
