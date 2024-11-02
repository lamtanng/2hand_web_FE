import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const StoreRegisterPage = lazy(() => import('.'));

export const StoreRegisterPageRoutes: RouteObject = {
  path: '/store-register',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <StoreRegisterPage />
    </Suspense>
  ),
};