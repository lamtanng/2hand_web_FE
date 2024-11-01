import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginRoute } from '../pages/LoginPage/Login.routes';
import { adminRoutes } from './admin.routes';
import { ProtectedRoutes } from '../components/layouts/ProtectedRoutes';
import { HomePageRoutes } from '../pages/HomePage/HomePage.routes';
import { SignupRoute } from '../pages/SignupPage/Signup.routes';
import { ProductListRoutes } from '../pages/ProductList/ProductList.routes';
import { ProductDetailRoutes } from '../pages/ProductDetail/ProductDetail.routes';
import { CartPageRoutes } from '../pages/CartPage/CartPage.routes';
import { ChekoutPageRoutes } from '../pages/CheckoutPage/CheckoutPage.routes';
import { StoreProfilePageRoutes } from '../pages/StoreProfilePage/StoreProfilePage.routes';
import Account from '../pages/customer/AccountPage';
import { ProfileRoutes } from '../pages/customer/AccountPage/Profile/Profile.routes';
import { AddressRoutes } from '../pages/customer/AccountPage/Address/Address.routes';
import { MyOrdersRoutes } from '../pages/customer/AccountPage/MyOrders/MyOrder.routes';
import { MyReviewsRoutes } from '../pages/customer/AccountPage/MyReviews/MyReviews.routes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      HomePageRoutes,
      ProductListRoutes,
      ProductDetailRoutes,
      LoginRoute,
      SignupRoute,
      {
        element: <ProtectedRoutes />,
        children: [adminRoutes],
      },
      CartPageRoutes,
      ChekoutPageRoutes,
      StoreProfilePageRoutes,
      {
        path: '/user',
        element: <Account />,
        children: [
          ProfileRoutes,
          AddressRoutes,
          MyOrdersRoutes,
          MyReviewsRoutes
        ]
      },
    ],
  },
]);

export default routes;
