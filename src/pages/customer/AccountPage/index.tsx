import { Flex } from 'antd';
import Header from '../../../components/elements/Header';
import MenuBar from './components/MenuBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/elements/Footer';

const Account = () => {
  return (
    <>
      <Header />
      <div className="mt-10 h-fit min-h-screen w-full bg-slate-50">
        <div className="mx-auto w-10/12 pb-20 pt-14">
          <Flex justify="space-between" gap={50}>
            <div className="w-1/5 flex-shrink-0">
              <MenuBar />
            </div>
            <div className="h-fit w-4/5 rounded-xl bg-white shadow-sm flex-grow-0">
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
