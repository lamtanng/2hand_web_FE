import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../../components/elements/Spin/PageSpin';
const MyReviews = lazy(() => import('.'));

export const MyReviewsRoutes: RouteObject = {
  path: accountUrls.reviewUrl,
  element: (
    <Suspense fallback={<PageSpin/>}>
      <MyReviews />
    </Suspense>
  ),
};
