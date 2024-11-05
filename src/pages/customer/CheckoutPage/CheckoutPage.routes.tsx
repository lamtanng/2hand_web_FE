import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { customerUrls } from '../../../constants/urlPaths/customer/customerUrls';
const ChekoutPage = lazy(() => import('.'));

export const ChekoutPageRoutes: RouteObject = {
  path: customerUrls.checkoutUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <ChekoutPage />
    </Suspense>
  ),
};
