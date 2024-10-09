import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authPaths } from '../../constants/apiPaths/authPaths';
const Signup = lazy(() => import('.'));

export const SignupRoute: RouteObject = {
  path: authPaths.signupPath,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Signup />
    </Suspense>
  ),
};
