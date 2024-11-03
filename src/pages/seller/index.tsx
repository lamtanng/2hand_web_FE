import { Outlet } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

const StoreLayout = () => {
  return (
    <Layout className='min-h-screen'>
      <Sider trigger={null} className='bg-slate-50'>
        <div className="demo-logo-vertical" />
        <MenuBar/>
      </Sider>
      <Layout>
        <Content className='p-10'>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StoreLayout;
