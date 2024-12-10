import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginRoute } from '../pages/LoginPage/Login.routes';
import { adminRoutes } from './admin.routes';
import { ProtectedRoutes } from '../components/layouts/ProtectedRoutes';
import { HomePageRoutes } from '../pages/HomePage/HomePage.routes';
import { SignupRoute } from '../pages/SignupPage/Signup.routes';
import { ProductListRoutes } from '../pages/ProductList/ProductList.routes';
import { ProductDetailRoutes } from '../pages/ProductDetail/ProductDetail.routes';
import { UserProfilePageRoutes } from '../pages/StoreProfilePage/UserProfilePage.routes';
import { CartPageRoutes } from '../pages/customer/CartPage/CartPage.routes';
import { ChekoutPageRoutes } from '../pages/customer/CheckoutPage/CheckoutPage.routes';
import { StoreRegisterPageRoutes } from '../pages/customer/StoreRegisterPage/StoreRegisterPage.routes';
import { UploadProductPageRoutes } from '../pages/customer/UploadProductPage/UploadProductPage.routes';
import { accountRoutes } from './account.routes';
import { ProtectedAdminRoutes } from '../components/layouts/ProtectedRoutes/ProtectedAdminRoutes';
import { OrderIntermediaryPageRoutes } from '../pages/customer/OrderIntermediaryPage/OrderIntermediaryPage.routes';
import ScrollToTop from '../components/layouts/ScrollToTop';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    children: [
      HomePageRoutes,
      ProductListRoutes,
      ProductDetailRoutes,
      UserProfilePageRoutes,
      LoginRoute,
      SignupRoute,
      {
        element: <ProtectedRoutes />,
        children: [
          accountRoutes,
          CartPageRoutes,
          ChekoutPageRoutes,
          StoreRegisterPageRoutes,
          UploadProductPageRoutes,
          OrderIntermediaryPageRoutes,
        ],
      },
      {
        element: <ProtectedAdminRoutes />,
        children: [adminRoutes],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/error',
    element: <ServerErrorPage />,
  },
]);

export default routes;
