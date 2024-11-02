import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Address = lazy(() => import('.'));

export const AddressRoutes: RouteObject = {
  path: 'addresses',
  element: (
    <Suspense fallback={<div>Loading</div>}>
      <Address />
    </Suspense>
  ),
};
