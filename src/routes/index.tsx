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
import Account from '../pages/customer/AccountPage';
import { ProfileRoutes } from '../pages/customer/AccountPage/Profile/Profile.routes';
import { AddressRoutes } from '../pages/customer/AccountPage/Address/Address.routes';
import { MyOrdersRoutes } from '../pages/customer/AccountPage/MyOrders/MyOrder.routes';
import { MyReviewsRoutes } from '../pages/customer/AccountPage/MyReviews/MyReviews.routes';
import { CartPageRoutes } from '../pages/customer/CartPage/CartPage.routes';
import { ChekoutPageRoutes } from '../pages/customer/CheckoutPage/CheckoutPage.routes';
import { OrderDetailRoutes } from '../pages/customer/AccountPage/OrderDetail/OrderDetail.routes';
import { StoreRegisterPageRoutes } from '../pages/customer/StoreRegisterPage/StoreRegisterPage.routes';
import { StoreDashboardRoutes } from '../pages/seller/Dashboard/Dashboard.routes';
import StoreLayout from '../pages/seller';
import { accountUrls } from '../constants/urlPaths/customer/accountUrls';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      HomePageRoutes,
      ProductListRoutes,
      ProductDetailRoutes,
      UserProfilePageRoutes,
      LoginRoute,
      SignupRoute,
      {
        element: <ProtectedRoutes />,
        children: [adminRoutes],
      },
      CartPageRoutes,
      ChekoutPageRoutes,
      StoreRegisterPageRoutes,
      {
        path: accountUrls.accountUrl,
        element: <Account />,
        children: [
          ProfileRoutes,
          AddressRoutes,
          MyOrdersRoutes,
          MyReviewsRoutes,
          OrderDetailRoutes,
        ]
      },
      {
        path: '/seller',
        element: <StoreLayout />,
        children: [
          StoreDashboardRoutes,
        ]
      },
    ],
  },
]);

export default routes;
