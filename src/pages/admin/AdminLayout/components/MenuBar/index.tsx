import {
  CarryOutOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Menu, MenuProps, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authAPIs } from '../../../../../apis/auth.api';
import { handleError } from '../../../../../utils/handleError';
import { deleteAuth } from '../../../../../redux/slices/login.slice';
import { useAppDispatch } from '../../../../../redux/hooks';

type MenuItem = Required<MenuProps>['items'][number];

const MenuBar = () => {
  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, disabled?: boolean): MenuItem {
    return {
      key,
      icon,
      label: <Link to={`${key}`}>{label}</Link>,
      disabled,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <HomeOutlined />),
    getItem('Accounts', 'accountList', <UserOutlined />),
    getItem('Products', 'productlist', <CarryOutOutlined />),
    getItem('Orders', 'orderList', <FileTextOutlined />),
    getItem('Logout', 'logout', <LogoutOutlined />),
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    <Flex vertical align="center">
      <Typography.Title className="mx-auto">
        <ShopOutlined />
      </Typography.Title>
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        items={items}
        className="h-full bg-slate-50 text-base"
        onClick={({ key }) => {
          if (key === 'logout') {
            handleLogOut();
            navigate('/');
          }
        }}
      />
    </Flex>
  );
};
export default MenuBar;
