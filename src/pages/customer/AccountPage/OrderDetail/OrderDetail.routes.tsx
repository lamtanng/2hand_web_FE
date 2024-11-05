import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
const OrderDetail = lazy(() => import('.'));

export const OrderDetailRoutes: RouteObject = {
  path: accountUrls.orderDetailUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <OrderDetail />
    </Suspense>
  ),
};
