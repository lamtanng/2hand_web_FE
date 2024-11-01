import { Flex } from 'antd';
import Header from '../../../components/elements/Header';
import MenuBar from './components/MenuBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/elements/Footer';

const Account = () => {
  return (
    <>
      <Header />
      <div className="mt-10 h-fit w-full bg-slate-50">
        <div className="mx-auto w-10/12 pb-20 pt-14">
          <Flex justify="space-between" gap={50}>
            <p className="w-1/5">
              <MenuBar />
            </p>
            <div className="w-4/5 rounded-xl bg-white shadow-sm">
              <Outlet />
            </div>
          </Flex>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
