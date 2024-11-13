import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PageSpin from '../../../../../components/elements/Spin/PageSpin';
const StoreProductsDetail = lazy(() => import('.'));

export const StoreProductsDetailRoutes: RouteObject = {
  path: 'products/:id',
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreProductsDetail />
    </Suspense>
  ),
};