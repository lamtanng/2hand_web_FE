import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authUrls } from '../../constants/urlPaths/authUrls';
const Login = lazy(() => import('.'));

export const LoginRoute: RouteObject = {
  path: authUrls.loginUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Login />
    </Suspense>
  ),
};
