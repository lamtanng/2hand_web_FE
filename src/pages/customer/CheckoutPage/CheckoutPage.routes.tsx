import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const ChekoutPage = lazy(() => import('.'));

export const ChekoutPageRoutes: RouteObject = {
  path: '/checkout',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <ChekoutPage />
    </Suspense>
  ),
};
