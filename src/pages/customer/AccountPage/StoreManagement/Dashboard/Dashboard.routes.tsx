import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const StoreDashboard = lazy(() => import('.'));

export const StoreDashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <StoreDashboard />
    </Suspense>
  ),
};