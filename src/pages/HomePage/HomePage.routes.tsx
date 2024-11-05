import { Flex, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const HomePage = lazy(() => import('.'));

export const HomePageRoutes: RouteObject = {
  path: '/',
  element: (
    <Suspense
      fallback={
        <Flex className="min-h-screen w-full" justify="center" align="center">
          <Spin size="large" />
        </Flex>
      }
    >
      <HomePage />
    </Suspense>
  ),
};
