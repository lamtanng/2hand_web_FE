import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authUrls } from '../../constants/urlPaths/authUrls';
const Signup = lazy(() => import('.'));

export const SignupRoute: RouteObject = {
  path: authUrls.signupUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Signup />
    </Suspense>
  ),
};
