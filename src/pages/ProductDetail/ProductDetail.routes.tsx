import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const ProductDetail = lazy(() => import('.'));

export const ProductDetailRoutes: RouteObject = {
  path: '/product-detail',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <ProductDetail />
    </Suspense>
  ),
};
