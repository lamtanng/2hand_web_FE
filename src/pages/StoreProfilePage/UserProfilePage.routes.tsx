import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { guestUrls } from '../../constants/urlPaths/guestUrls';
import PageSpin from '../../components/elements/Spin/PageSpin';
const UserProfilePage = lazy(() => import('.'));

export const UserProfilePageRoutes: RouteObject = {
  path: guestUrls.userProfileUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <UserProfilePage />
    </Suspense>
  ),
};
