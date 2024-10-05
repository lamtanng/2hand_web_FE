import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const HomePage = lazy(() => import('.'));

export const HomePageRoutes: RouteObject = {
  path: '/',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <HomePage />
    </Suspense>
  ),
};
