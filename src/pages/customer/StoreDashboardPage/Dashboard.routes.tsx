import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const StoreDashboard = lazy(() => import('.'));

export const StoreDashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreDashboard />
    </Suspense>
  ),
};