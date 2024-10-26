import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const CartPage = lazy(() => import('.'));

export const CartPageRoutes: RouteObject = {
  path: '/cart',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <CartPage />
    </Suspense>
  ),
};
