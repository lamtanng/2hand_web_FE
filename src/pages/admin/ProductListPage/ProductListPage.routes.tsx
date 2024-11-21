import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const ProductListPage = lazy(() => import('.'));

export const ProductListPageRoute: RouteObject = {
  path: 'productList',
  element: (
    <Suspense fallback={<PageSpin />}>
      <ProductListPage />
    </Suspense>
  ),
};
