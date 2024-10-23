import { Divider, Flex, Pagination, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import Search from 'antd/es/transfer/search';
import Filter from './components/Filter';
import ListProducts from './components/ListProducts';
import CustomBreadcrumb from '../../components/elements/Breadcrumb';
import useListProducts from './useProductListPage';

const ProductList = () => {
  const { product, totalProducts, category, isLoading } = useListProducts();

  return (
    <>
      <Header />
      <div className="mx-5 mb-10 mt-10 md:mx-10 md:mb-20 md:mt-20 md:py-5 xl:mx-auto xl:w-10/12">
        <CustomBreadcrumb />
        <Flex gap={'large'}>
          <Flex vertical gap={'large'} className="w-1/5">
            <Search placeholder="Search for a product" />
            <Filter category={category} />
          </Flex>
          <Divider type="vertical" className="h-screen" />
          <div className="w-4/5">
            <Flex justify="space-between" align="baseline">
              <Flex gap={'small'} align="baseline">
                <Typography.Title level={3}>Products</Typography.Title>
                <Typography.Paragraph className="text-gray-600">({totalProducts} products)</Typography.Paragraph>
              </Flex>
              <Flex gap={'middle'}>
                <p>Sort by:</p>
              </Flex>
            </Flex>
            {isLoading && <p>Loaing products...</p>}
            {product.length !== 0 ? (
              <>
                <ListProducts productList={product} />
                <Pagination align="center" defaultCurrent={1} total={totalProducts} className="mt-10" />
              </>
            ) : (
              <Flex vertical align="center">
                <Typography.Title level={4} className="text-blue-600">
                  No product is found
                </Typography.Title>
                <Typography.Paragraph>
                  Please try again by reducing filters or checking your spelling.
                </Typography.Paragraph>
              </Flex>
            )}
          </div>
        </Flex>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
