import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const Login = lazy(() => import('.'));

export const LoginRoute: RouteObject = {
  path: 'login',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Login />
    </Suspense>
  ),
};
