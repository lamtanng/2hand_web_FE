import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authUrls } from '../../constants/urlPaths/authUrls';
import PageSpin from '../../components/elements/Spin/PageSpin';
const Signup = lazy(() => import('.'));

export const SignupRoute: RouteObject = {
  path: authUrls.signupUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Signup />
    </Suspense>
  ),
};
