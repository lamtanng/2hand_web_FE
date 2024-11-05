import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../components/elements/Spin/PageSpin';
const HomePage = lazy(() => import('.'));

export const HomePageRoutes: RouteObject = {
  path: '/',
  element: (
    <Suspense fallback={<PageSpin />}>
      <HomePage />
    </Suspense>
  ),
};
