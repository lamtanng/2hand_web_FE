import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { adminPaths } from '../../../constants/apiPaths/adminPaths';
const Dashboard = lazy(() => import('.'));

export const DashboardRoute: RouteObject = {
  path: adminPaths.dashboardPath,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Dashboard />
    </Suspense>
  ),
};
