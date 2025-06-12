import Header from '../../../components/elements/Header';
import { Typography } from 'antd';
import StoreRegisterForm from './components/StoreRegisterForm';

const StoreRegister = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-32 md:py-10 md:pb-20 xl:mx-auto xl:w-8/12">
          <Typography.Title level={3} className="m-0 mb-6 text-blue-600">
            Store Registering
          </Typography.Title>
          <StoreRegisterForm />
        </div>
      </div>
    </>
  );
};

export default StoreRegister;
