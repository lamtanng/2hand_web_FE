import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const UploadProductPage = lazy(() => import('.'));

export const UploadProductPageRoutes: RouteObject = {
  path: '/product/upload',
  element: (
    <Suspense fallback={<PageSpin />}>
      <UploadProductPage />
    </Suspense>
  ),
};
