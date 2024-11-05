import { Flex, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const ProductDetail = lazy(() => import('.'));

export const ProductDetailRoutes: RouteObject = {
  path: '/:productSlug',
  element: (
    <Suspense
      fallback={
        <Flex className="min-h-screen w-full" justify="center" align="center">
          <Spin size="large" />
        </Flex>
      }
    >
      <ProductDetail />
    </Suspense>
  ),
};
