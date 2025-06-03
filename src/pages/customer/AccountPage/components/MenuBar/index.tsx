import {
  CarryOutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HeartOutlined,
  // HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  // NotificationOutlined,
  // QuestionCircleOutlined,
  SettingOutlined,
  ShopOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Flex, Menu, MenuProps, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useAccountPage from '../../useAccountPage';
import { handleError } from '../../../../../utils/handleError';
import { authAPIs } from '../../../../../apis/auth.api';
import { useAppDispatch } from '../../../../../redux/hooks';
import { deleteAuth } from '../../../../../redux/slices/login.slice';
import { formattedName } from '../../../../../utils/formatName';
import { authUrls } from '../../../../../constants/urlPaths/authUrls';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, disabled?: boolean): MenuItem {
  return {
    key,
    icon,
    label: <Link to={`${key}`}>{label}</Link>,
    disabled,
  } as MenuItem;
}
const baseURL = 'http://localhost:5173/account/';

const MenuBar = () => {
  const { profile } = useAccountPage();
  const isSeller =
    profile?.roleID?.filter((role: any) => role === '670d2db6d696affd52e661c3').length !== 0 ? true : false;

  const items: MenuItem[] = [
    {
      key: 'account',
      label: 'My Account',
      children: [
        getItem('Profile', 'profile', <UserOutlined />),
        getItem('My Addresses', 'addresses', <HomeOutlined />),
        getItem('Notifications', 'notifications', <NotificationOutlined />),
        getItem('My Purchases', 'purchases', <FileTextOutlined />),
        getItem('My Reviews', 'reviews', <StarOutlined />),
        // getItem('Wishlist', 'wishlist', <HeartOutlined />),
      ],
    },
    {
      key: 'store',
      label: 'Store Management',
      children: [
        getItem('Dashboard', 'dashboard', <DashboardOutlined />),
        getItem('Products', 'products', <CarryOutOutlined />),
        getItem('Orders', 'orders', <FileTextOutlined />),
        // getItem('Store Reviews', 'store-reviews', <StarOutlined />),
        getItem('Store Profile', 'store-profile', <ShopOutlined />),
      ],
      disabled: !isSeller
    },
    {
      key: 'setting',
      label: 'Settings',
      children: [
        getItem('Change Password', 'changepassword', <SettingOutlined />, true),
        // getItem('Help Center', 'helpcenter', <QuestionCircleOutlined />, true),
        getItem('Log Out', 'logout', <LogoutOutlined />),
      ],
    },
  ];


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectedKey = window.location.href.replace(baseURL, '');

  const handleLogOut = async () => {
    try {
      await authAPIs.logout();
      dispatch(deleteAuth());
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return (
    <>
      <Flex align="center" gap={'middle'} className="mb-3 px-3">
        <Avatar src={profile?.avatar} icon={<UserOutlined />} size={75} className="shrink-0" />
        <Typography.Title level={4}>{formattedName(profile)}</Typography.Title>
      </Flex>
      <Menu
        defaultOpenKeys={['account', 'purchase', 'setting']}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
        className="bg-slate-50 text-base"
        onClick={({ key }) => {
          if (key === 'logout') {
            handleLogOut();
            navigate(`/${authUrls.loginUrl}`);
          }
        }}
      />
    </>
  );
};

export default MenuBar;
