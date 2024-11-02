import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const OrderDetail = lazy(() => import('.'));

export const OrderDetailRoutes: RouteObject = {
  path: 'orders/id',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <OrderDetail />
    </Suspense>
  ),
};
