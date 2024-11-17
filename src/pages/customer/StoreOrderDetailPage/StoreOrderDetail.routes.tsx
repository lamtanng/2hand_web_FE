import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const OrderDetail = lazy(() => import('../AccountPage/components/OrderDetail'));

export const StoreOrderDetailRoutes: RouteObject = {
  path: accountUrls.orderDetailUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <OrderDetail />
    </Suspense>
  ),
};