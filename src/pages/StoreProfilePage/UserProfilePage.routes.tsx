import { Flex, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { guestUrls } from '../../constants/urlPaths/guestUrls';
const UserProfilePage = lazy(() => import('.'));

export const UserProfilePageRoutes: RouteObject = {
  path: guestUrls.userProfileUrl,
  element: (
    <Suspense
      fallback={
        <Flex className="min-h-screen w-full" justify="center" align="center">
          <Spin size="large" />
        </Flex>
      }
    >
      <UserProfilePage />
    </Suspense>
  ),
};
