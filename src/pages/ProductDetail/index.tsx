import { Typography } from 'antd';
import CustomBreadcrumb from '../../components/elements/Breadcrumb';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import ProductSlider from '../../components/elements/Slider/ProductSlider';
import ProductList from '../../components/elements/Lists/ProductList';
import ProductInfo from './components/ProductInfo';
import ShopInfo from './components/ShopInfo';
import ProductFeatures from './components/ProductFeatures';
import useProductDetail from './useProductDetail';

const ProductDetail = () => {
  const { product, isLoading, storeProduct } = useProductDetail();
  console.log(product);
  return (
    <>
      <Header />
      <div className="-m-6 min-h-screen bg-slate-50 px-5">
        <div className="mx-5 mb-10 md:mx-10 md:mt-20 md:py-10 md:pb-20 xl:mx-auto xl:w-10/12">
          <CustomBreadcrumb />
          <ProductInfo />
          <ShopInfo />
          <ProductFeatures />
          <div id="description" className="mb-5 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Title level={4} className="m-0 mb-8">
              Product's Description
            </Typography.Title>
            <Typography.Paragraph className="m-0">{product?.description}</Typography.Paragraph>
          </div>
          <div id="shop-products" className="mb-5 p-8">
            <Typography.Title level={4} className="m-0 mb-8">
              Other Products From Seller
            </Typography.Title>
            <ProductSlider product={storeProduct} isLoading={isLoading} />
          </div>
          <div id="recommend-products" className="mb-5 p-8">
            <Typography.Title level={4} className="m-0 mb-8">
              Recommend Products
            </Typography.Title>
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
