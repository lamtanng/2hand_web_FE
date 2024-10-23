import { Divider, Flex, Pagination, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
import Header from '../../components/elements/Header';
import Search from 'antd/es/transfer/search';
import Filter from './components/Filter';
import ListProducts from './components/ListProducts';
import CustomBreadcrumb from './components/Breadcrumb';

const ProductList = () => {
  return (
    <>
      <Header />
      <div className="mx-5 mb-10 mt-10 md:mx-10 md:mb-20 md:mt-20 md:py-5 xl:mx-auto xl:w-10/12">
        <CustomBreadcrumb />
        <Flex gap={'large'}>
          <Flex vertical gap={'large'} className="w-1/5">
            <Search placeholder="Search for a product" />
            <Filter />
          </Flex>
          <Divider type="vertical" className="h-screen" />
          <div className="w-4/5">
            <Flex justify="space-between" align="baseline">
              <Flex gap={'small'} align="baseline">
                <Typography.Title level={3}>Products</Typography.Title>
                <Typography.Paragraph className="text-gray-600">(Total products)</Typography.Paragraph>
              </Flex>
              <Flex gap={'middle'}>
                <p>Sort by:</p>
              </Flex>
            </Flex>
            <ListProducts />
            <Pagination align="center" defaultCurrent={1} total={50} className='mt-10' />
          </div>
        </Flex>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
