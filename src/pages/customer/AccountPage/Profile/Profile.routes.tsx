import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../../components/elements/Spin/PageSpin';
const Profile = lazy(() => import('.'));

export const ProfileRoutes: RouteObject = {
  path: accountUrls.profileUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Profile />
    </Suspense>
  ),
};
