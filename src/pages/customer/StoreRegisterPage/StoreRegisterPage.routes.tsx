import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { customerUrls } from '../../../constants/urlPaths/customer/customerUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const StoreRegisterPage = lazy(() => import('.'));

export const StoreRegisterPageRoutes: RouteObject = {
  path: customerUrls.storeRegisterUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreRegisterPage />
    </Suspense>
  ),
};
