import { Divider, Flex, Typography } from 'antd';
import ProductCard from '../../components/elements/Cards/ProductCard';
import Header from '../../components/elements/Header';
import ProductSlider from '../../components/elements/Slider/ProductSlider';
import PageSpin from '../../components/elements/Spin/PageSpin';
import { ProductProps } from '../../types/product.type';
import CustomCarousel from './components/Carousel';
import CategorySlider from './components/CategorySlider';
import Collection from './components/Collection';
import SystemInfo from './components/SystemInfo';
import useHomePage from './useHomePage';

const HomePage = () => {
  const { freeProduct, isLoading, newestProduct, recommendedProduct } = useHomePage();

  return (
    <>
      <Header />
      <div className="bg-slate-50">
        {isLoading ? (
          <PageSpin />
        ) : (
          <Flex vertical className="mt-10 w-full md:mt-32">
            <div className="p-10">
              <CustomCarousel />
            </div>
            <Flex vertical gap={45} className="mx-5 md:mx-10 xl:mx-auto xl:w-10/12">
              <div>
                <Typography.Title level={2}>Categories</Typography.Title>
                <CategorySlider />
                <Collection />
              </div>
              <div>
                <Typography.Title level={2}>New Products</Typography.Title>
                <ProductSlider product={newestProduct} isLoading={isLoading} />
              </div>
              <div>
                <Typography.Title level={2}>Free Products</Typography.Title>
                <ProductSlider product={freeProduct} isLoading={isLoading} />
              </div>
              {recommendedProduct?.length > 0 && (
                <div>
                  <Typography.Title level={2}>Recommended Products</Typography.Title>
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-3 md:gap-x-0 md:gap-y-6 xl:grid-cols-5">
                    {recommendedProduct?.map((item: ProductProps) => (
                      <div key={item._id}>
                        <ProductCard product={item} isLoading={isLoading} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Divider />
              <div className="pb-20">
                <Typography.Title level={2}>About Us</Typography.Title>
                <SystemInfo />
              </div>
            </Flex>
          </Flex>
        )}
      </div>
    </>
  );
};

export default HomePage;
