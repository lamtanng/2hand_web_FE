import { Divider, Flex, Typography } from 'antd';
import Header from '../../components/elements/Header';
import Search from 'antd/es/transfer/search';
import Filter from './components/Filter';
import ListProducts from './components/ListProducts';
// import CustomBreadcrumb from '../../components/elements/Breadcrumb';
import useListProducts from './useProductListPage';
import CustomPagination from './components/Pagination';
import Sort from './components/Sort';
import NoProduct from './components/NoProduct';
import PageSpin from '../../components/elements/Spin/PageSpin';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { guestUrls } from '../../constants/urlPaths/guestUrls';

const ProductList = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { product, totalProducts, category, isLoading } = useListProducts();

  const onSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', event.target.value);
    }
    navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
  }, 300);

  return (
    <>
      <Header />
      <div>
        <div className="mx-5 mt-10 md:mx-10 md:mt-32 md:py-5 xl:mx-auto xl:w-10/12">
          {/* <CustomBreadcrumb /> */}
          <Flex gap={'large'} className="mt-5">
            <Flex vertical gap={'large'} className="w-1/5">
              <Search placeholder="Search for a product" onChange={onSearch} />
              <Filter category={category} />
            </Flex>
            <Divider type="vertical" className="h-screen" />
            <div className="w-4/5">
              <Flex justify="space-between" align="baseline">
                <Flex gap={'small'} align="baseline">
                  <Typography.Title level={3}>Products</Typography.Title>
                  {/* <Typography.Paragraph className="text-gray-600">({totalProducts} products)</Typography.Paragraph> */}
                </Flex>
                <Flex gap={'middle'} align="center">
                  <p>Sort by:</p>
                  <Sort />
                </Flex>
              </Flex>
              {isLoading ? (
                <PageSpin />
              ) : product?.length !== 0 ? (
                <>
                  <ListProducts productList={product} isLoading={isLoading} />
                  <CustomPagination totalProducts={totalProducts} />
                </>
              ) : (
                <NoProduct />
              )}
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default ProductList;
