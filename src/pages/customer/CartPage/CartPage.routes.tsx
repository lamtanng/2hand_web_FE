import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { customerUrls } from '../../../constants/urlPaths/customer/customerUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const CartPage = lazy(() => import('.'));

export const CartPageRoutes: RouteObject = {
  path: customerUrls.cartUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <CartPage />
    </Suspense>
  ),
};
