import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { customerUrls } from '../../../constants/urlPaths/customer/customerUrls';
const CartPage = lazy(() => import('.'));

export const CartPageRoutes: RouteObject = {
  path: customerUrls.cartUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <CartPage />
    </Suspense>
  ),
};
