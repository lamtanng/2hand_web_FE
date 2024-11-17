import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const StoreReview = lazy(() => import('.'));

export const StoreReviewRoutes: RouteObject = {
  path: 'store-reviews',
  element: (
    <Suspense fallback={<PageSpin />}>
      <StoreReview />
    </Suspense>
  ),
};