import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const StoreOrder = lazy(() => import('.'));

export const StoreOrderRoutes: RouteObject = {
  path: accountUrls.orderUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreOrder />
    </Suspense>
  ),
};