import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Profile = lazy(() => import('.'));

export const ProfileRoutes: RouteObject = {
  path: 'profile',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Profile />
    </Suspense>
  ),
};
