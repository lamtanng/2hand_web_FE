import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const StoreProfilePage = lazy(() => import('.'));

export const StoreProfilePageRoutes: RouteObject = {
  path: '/store',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <StoreProfilePage />
    </Suspense>
  ),
};
