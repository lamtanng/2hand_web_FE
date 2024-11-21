import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const AccountListPage = lazy(() => import('.'));

export const AccountListPageRoute: RouteObject = {
  path: 'accountList',
  element: (
    <Suspense fallback={<PageSpin />}>
      <AccountListPage />
    </Suspense>
  ),
};
