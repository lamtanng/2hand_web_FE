import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
const MyReviews = lazy(() => import('.'));

export const MyReviewsRoutes: RouteObject = {
  path: accountUrls.reviewUrl,
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <MyReviews />
    </Suspense>
  ),
};
