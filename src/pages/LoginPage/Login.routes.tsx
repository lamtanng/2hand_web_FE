import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authPaths } from '../../constants/apiPaths/authPaths';
const Login = lazy(() => import('.'));

export const LoginRoute: RouteObject = {
  path: authPaths.loginPath,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Login />
    </Suspense>
  ),
};
