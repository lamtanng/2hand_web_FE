import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const Notifications = lazy(() => import('.'));

export const NotificationsRoutes: RouteObject = {
  path: accountUrls.notificationsUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Notifications />
    </Suspense>
  ),
};