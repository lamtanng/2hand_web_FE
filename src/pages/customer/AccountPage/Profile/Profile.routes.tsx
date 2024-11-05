import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
const Profile = lazy(() => import('.'));

export const ProfileRoutes: RouteObject = {
  path: accountUrls.profileUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Profile />
    </Suspense>
  ),
};
