import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const ProductList = lazy(() => import('.'));

export const ProductListRoutes: RouteObject = {
  path: '/product-list',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <ProductList />
    </Suspense>
  ),
};
