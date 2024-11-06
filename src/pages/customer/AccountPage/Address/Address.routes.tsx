import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../../components/elements/Spin/PageSpin';
const Address = lazy(() => import('.'));

export const AddressRoutes: RouteObject = {
  path: accountUrls.addressUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Address />
    </Suspense>
  ),
};
