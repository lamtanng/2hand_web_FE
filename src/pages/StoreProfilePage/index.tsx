import { Button, Flex, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import useUserProfileDetail from './useUserProfileName';
import ProductSlider from '../../components/elements/Slider/ProductSlider';
import UserInfo from './components/UserInfo';
import StoreInfo from './components/StoreInfo';
import PageSpin from '../../components/elements/Spin/PageSpin';

const UserProfilePage = () => {
  const { store, isLoading, storeProduct } = useUserProfileDetail();

  return (
    <>
      <Header />
      {isLoading ? (
        <PageSpin />
      ) : (
        <div className="-mt-2 min-h-screen bg-slate-50 px-5">
          <div className="mx-5 md:mx-10 md:mt-32 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
            <UserInfo />
            {store && (
              <>
                <StoreInfo />
                <div className="mb-6 p-8">
                  <Flex align="baseline" gap={'large'}>
                    <Typography.Title level={3} className="m-0">
                      Posted Products
                    </Typography.Title>
                    <Button variant="link" color="primary" className="p-0" href="/product-list">
                      View all products
                    </Button>
                  </Flex>
                  <ProductSlider isLoading={isLoading} product={storeProduct} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserProfilePage;
