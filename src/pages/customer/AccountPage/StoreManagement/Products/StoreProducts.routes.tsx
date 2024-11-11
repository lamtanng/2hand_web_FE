import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../../../components/elements/Spin/PageSpin';
const StoreProducts = lazy(() => import('.'));

export const StoreProductsRoutes: RouteObject = {
  path: 'products',
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreProducts />
    </Suspense>
  ),
};