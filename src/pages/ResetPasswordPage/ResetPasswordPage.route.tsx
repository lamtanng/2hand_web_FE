import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { authUrls } from '../../constants/urlPaths/authUrls';
import PageSpin from '../../components/elements/Spin/PageSpin';
const ResetPasswordPage = lazy(() => import('.'));

export const ResetPasswordPageRoute: RouteObject = {
  path: authUrls.resetPasswordUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <ResetPasswordPage />
    </Suspense>
  ),
};