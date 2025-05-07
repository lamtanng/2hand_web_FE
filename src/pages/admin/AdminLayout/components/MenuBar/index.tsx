import {
  BookOutlined,
  CarryOutOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authAPIs } from '../../../../../apis/auth.api';
import { handleError } from '../../../../../utils/handleError';
import { deleteAuth } from '../../../../../redux/slices/login.slice';
import { useAppDispatch } from '../../../../../redux/hooks';

type MenuItem = Required<MenuProps>['items'][number];

const MenuBar = () => {
  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      key,
      icon,
      label: <Link to={`${key}`}>{label}</Link>,
      children,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <HomeOutlined />),
    getItem('Accounts', 'accountList', <UserOutlined />),
    getItem('Categories', 'categoryList', <MenuOutlined />),
    getItem('Products', 'productList', <CarryOutOutlined />),
    getItem('Orders', 'orderList', <FileTextOutlined />),
    getItem('Policies', 'policies', <BookOutlined />, [
      getItem('Cancel Order', 'policies/cancel-order'),
      getItem('Return Order', 'policies/return-order'),
      getItem('Report', 'policies/report'),
    ]),
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
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        items={items}
        className=" bg-slate-50 text-base"
        onClick={({ key }) => {
          if (key === 'logout') {
            handleLogOut();
            navigate(`/`);
          }
        }}
      />
  );
};
export default MenuBar;
