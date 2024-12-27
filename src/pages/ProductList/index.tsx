import { Divider, Flex, Typography } from 'antd';
import Footer from '../../components/elements/Footer';
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

const ProductList = () => {
  const {
    product,
    totalProducts,
    category,
    setPrice,
    setQuality,
    isLoading,
    setSort,
    setSearch,
    quality,
    limit,
    setPage,
    setLimit,
    setSelectedCategory,
    selectedCategory,
  } = useListProducts();

  return (
    <>
      <Header />
      <div className="bg-slate-50">
        <div className="mx-5 mt-10 md:mx-10  md:mt-32 md:py-5 xl:mx-auto xl:w-10/12">
          {/* <CustomBreadcrumb /> */}
          <Flex gap={'large'} className="mt-5">
            <Flex vertical gap={'large'} className="w-1/5">
              <Search placeholder="Search for a product" onChange={(event) => setSearch(event.target.value)} />
              <Filter
                category={category}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                setPrice={setPrice}
                setQuality={setQuality}
                setPage={setPage}
                quality={quality}
              />
            </Flex>
            <Divider type="vertical" className="h-screen" />
            <div className="w-4/5">
              <Flex justify="space-between" align="baseline">
                <Flex gap={'small'} align="baseline">
                  <Typography.Title level={3}>Products</Typography.Title>
                  <Typography.Paragraph className="text-gray-600">({totalProducts} products)</Typography.Paragraph>
                </Flex>
                <Flex gap={'middle'} align="center">
                  <p>Sort by:</p>
                  <Sort setSort={setSort} />
                </Flex>
              </Flex>
              {isLoading ? (
                <PageSpin />
              ) : product?.length !== 0 ? (
                <>
                  <ListProducts productList={product} isLoading={isLoading} />
                  {product.length > limit && <CustomPagination limit={limit} setLimit={setLimit} setPage={setPage} totalProducts={totalProducts} />}
                </>
              ) : (
                <NoProduct />
              )}
            </div>
          </Flex>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
