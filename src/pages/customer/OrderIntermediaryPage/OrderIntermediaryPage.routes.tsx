import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const OrderIntermediaryPage = lazy(() => import('.'));

export const OrderIntermediaryPageRoutes: RouteObject = {
  path: 'intermediary',
  element: (
    <Suspense fallback={<PageSpin/>}>
      <OrderIntermediaryPage />
    </Suspense>
  ),
};