import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const StoreProfile = lazy(() => import('.'));

export const StoreProfileRoutes: RouteObject = {
  path: 'store-profile',
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreProfile />
    </Suspense>
  ),
};