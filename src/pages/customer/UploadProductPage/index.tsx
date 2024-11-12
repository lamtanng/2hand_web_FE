import { Typography } from 'antd';
import Footer from '../../../components/elements/Footer';
import Header from '../../../components/elements/Header';
import ProductForm from './components/ProductForm';
import useUploadProductPage from './useUploadProductPage';

const UploadProductPage = () => {
  const { category, store } = useUploadProductPage();

  return (
    <>
      <Header />
      <div className="-m-6 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-8/12">
          <Typography.Title level={3} className="m-0 mb-6 text-blue-600">
            Upload a Product
          </Typography.Title>
          <div className="mb-5 rounded-xl bg-white p-8 shadow-sm">
            <ProductForm category={category} store={store} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadProductPage;
