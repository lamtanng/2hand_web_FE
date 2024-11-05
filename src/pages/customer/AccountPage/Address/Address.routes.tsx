import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
const Address = lazy(() => import('.'));

export const AddressRoutes: RouteObject = {
  path: accountUrls.addressUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Address />
    </Suspense>
  ),
};
