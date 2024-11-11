import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { adminPaths } from '../../../constants/apiPaths/adminPaths';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const Dashboard = lazy(() => import('.'));

export const DashboardRoute: RouteObject = {
  path: adminPaths.dashboardPath,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Dashboard />
    </Suspense>
  ),
};
