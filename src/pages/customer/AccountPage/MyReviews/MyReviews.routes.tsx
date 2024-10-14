import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const MyReviews = lazy(() => import('.'));

export const MyReviewsRoutes: RouteObject = {
  path: 'reviews',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <MyReviews />
    </Suspense>
  ),
};
