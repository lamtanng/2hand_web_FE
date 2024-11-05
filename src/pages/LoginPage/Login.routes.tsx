import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authUrls } from '../../constants/urlPaths/authUrls';
import PageSpin from '../../components/elements/Spin/PageSpin';
const Login = lazy(() => import('.'));

export const LoginRoute: RouteObject = {
  path: authUrls.loginUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Login />
    </Suspense>
  ),
};
