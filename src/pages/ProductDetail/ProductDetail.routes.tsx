import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { guestUrls } from '../../constants/urlPaths/guestUrls';
import PageSpin from '../../components/elements/Spin/PageSpin';
const ProductDetail = lazy(() => import('.'));

export const ProductDetailRoutes: RouteObject = {
  path: guestUrls.productDetailUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <ProductDetail />
    </Suspense>
  ),
};
