import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const CustomerOrderDetail = lazy(() => import('.'));

export const OrderDetailRoutes: RouteObject = {
  path: accountUrls.purchasesDetailUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <CustomerOrderDetail />
    </Suspense>
  ),
};
