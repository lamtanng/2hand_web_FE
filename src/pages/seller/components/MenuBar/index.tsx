import { CarryOutOutlined, FileTextOutlined, HomeOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Menu, MenuProps, Typography } from 'antd';
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
  getItem('Dashboard', 'dashboard', <HomeOutlined />),
  getItem('Products', 'productlist', <CarryOutOutlined />),
  getItem('Orders', 'profile', <FileTextOutlined />),
  getItem('Profile', 'profile', <UserOutlined />),
];

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <Flex vertical align='center'>
      <Typography.Title className="mx-auto">
        <ShopOutlined />
      </Typography.Title>
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        items={items}
        className="h-full bg-slate-50 text-base"
        onClick={({ key }) => {
          if (key === '/signin') {
          }
          navigate(key);
        }}
      />
    </Flex>
  );
};

export default MenuBar;
