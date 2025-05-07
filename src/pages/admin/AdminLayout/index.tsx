import { Layout, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import { useState } from 'react';
import { ShopOutlined } from '@ant-design/icons';
const { Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="min-h-screen">
      <Sider
        className="w-auto bg-slate-50"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Typography.Title className="mx-auto text-center">
          <ShopOutlined />
        </Typography.Title>
        <MenuBar />
      </Sider>
      <Layout>
        <Content className="p-10">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
