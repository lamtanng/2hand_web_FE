import { Flex, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { guestUrls } from '../../constants/urlPaths/guestUrls';
const ProductList = lazy(() => import('.'));

export const ProductListRoutes: RouteObject = {
  path: guestUrls.productListUrl,
  element: (
    <Suspense
      fallback={
        <Flex className='w-full min-h-screen' justify='center' align='center'>
          <Spin size="large"/>
        </Flex>
      }
    >
      <ProductList />
    </Suspense>
  ),
};
