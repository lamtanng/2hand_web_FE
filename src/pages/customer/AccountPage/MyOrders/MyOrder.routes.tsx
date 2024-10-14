import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const MyOrders = lazy(() => import('.'));

export const MyOrdersRoutes: RouteObject = {
  path: 'orders',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <MyOrders />
    </Suspense>
  ),
};
