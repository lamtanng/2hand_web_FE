import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const OrderListPage = lazy(() => import('.'));

export const OrderListPageRoute: RouteObject = {
  path: 'orderList',
  element: (
    <Suspense fallback={<PageSpin />}>
      <OrderListPage />
    </Suspense>
  ),
};
