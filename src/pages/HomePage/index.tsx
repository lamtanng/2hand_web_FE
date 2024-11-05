import { Divider, Flex, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
// import { useAppSelector } from '../../redux/hooks';
// import { loginSelector } from '../../redux/slices/login.slice';
import CustomCarousel from './components/Carousel';
import CategorySlider from './components/CategorySlider';
import ProductSlider from '../../components/elements/Slider/ProductSlider';
import ProductList from '../../components/elements/Lists/ProductList';
import SystemInfo from './components/SystemInfo';
import Collection from './components/Collection';
import useHomePage from './useHomePage';

const HomePage = () => {
  const {freeProduct, isLoading, newestProduct} = useHomePage();

  return (
    <>
      <Header />
      <Flex vertical className="mb-10 mt-10 w-full md:mb-20 md:mt-20">
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
          <div>
            <Typography.Title level={2}>Recommended Products</Typography.Title>
            <ProductList />
          </div>
          <Divider />
          <div>
            <Typography.Title level={2}>About Us</Typography.Title>
            <SystemInfo />
          </div>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default HomePage;
