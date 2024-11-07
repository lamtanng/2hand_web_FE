import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { accountUrls } from '../../../../../constants/urlPaths/customer/accountUrls';
const StoreOrder = lazy(() => import('.'));

export const StoreOrderRoutes: RouteObject = {
  path: accountUrls.orderUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <StoreOrder />
    </Suspense>
  ),
};