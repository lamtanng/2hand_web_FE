import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import PageSpin from '../../../components/elements/Spin/PageSpin';
const Wishlist = lazy(() => import('.'));

export const WishlistRoutes: RouteObject = {
  path: accountUrls.wishlistUrl,
  element: (
    <Suspense fallback={<PageSpin />}>
      <Wishlist />
    </Suspense>
  ),
};
