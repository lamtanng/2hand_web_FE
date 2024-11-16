import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const MyOrders = lazy(() => import('.'));

export const MyOrdersRoutes: RouteObject = {
  path: accountUrls.puchasesUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <MyOrders />
    </Suspense>
  ),
};
