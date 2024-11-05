import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { guestUrls } from '../../constants/urlPaths/guestUrls';
import PageSpin from '../../components/elements/Spin/PageSpin';
const ProductList = lazy(() => import('.'));

export const ProductListRoutes: RouteObject = {
  path: guestUrls.productListUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <ProductList />
    </Suspense>
  ),
};
