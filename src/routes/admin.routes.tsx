import { RouteObject } from 'react-router-dom';
import { adminPaths } from '../constants/apiPaths/adminPaths';
import { DashboardRoute } from '../pages/admin/DashboardPage/Dashboard.routes';
import { ProtectedAdminRoutes } from '../components/layouts/ProtectedRoutes/ProtectedAdminRoutes';
export const adminRoutes: RouteObject = {
  path: adminPaths.adminPath,
  element: <ProtectedAdminRoutes />,
  children: [DashboardRoute],
};
