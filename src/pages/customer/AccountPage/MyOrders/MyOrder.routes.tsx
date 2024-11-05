import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
const MyOrders = lazy(() => import('.'));

export const MyOrdersRoutes: RouteObject = {
  path: accountUrls.orderUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <MyOrders />
    </Suspense>
  ),
};
