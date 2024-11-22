import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const StoreOrderDetail = lazy(() => import('.'));

export const StoreOrderDetailRoutes: RouteObject = {
  path: accountUrls.orderDetailUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreOrderDetail />
    </Suspense>
  ),
};
