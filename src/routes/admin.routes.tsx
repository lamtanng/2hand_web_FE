import { RouteObject } from 'react-router-dom';
import { adminPaths } from '../constants/apiPaths/adminPaths';
import { DashboardRoute } from '../pages/admin/DashboardPage/Dashboard.routes';
import AdminLayout from '../pages/admin/AdminLayout';
import { AccountListPageRoute } from '../pages/admin/AccountListPage/AccountListPage.routes';
import { OrderListPageRoute } from '../pages/admin/OrderListPage/OrderListPage.routes';
import { ProductListPageRoute } from '../pages/admin/ProductListPage/ProductListPage.routes';

export const adminRoutes: RouteObject = {
  path: adminPaths.adminPath,
  element: <AdminLayout />,
  children: [DashboardRoute, AccountListPageRoute, OrderListPageRoute, ProductListPageRoute],
};
