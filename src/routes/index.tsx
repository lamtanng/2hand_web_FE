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
import { CartPageRoutes } from '../pages/customer/CartPage/CartPage.routes';
import { ChekoutPageRoutes } from '../pages/customer/CheckoutPage/CheckoutPage.routes';
import { StoreRegisterPageRoutes } from '../pages/customer/StoreRegisterPage/StoreRegisterPage.routes';
import { accountUrls } from '../constants/urlPaths/customer/accountUrls';
import { UploadProductPageRoutes } from '../pages/customer/UploadProductPage/UploadProductPage.routes';
import { MyOrdersRoutes } from '../pages/customer/CustomerOrderPage/MyOrder.routes';
import { MyReviewsRoutes } from '../pages/customer/CustomerReviewPage/MyReviews.routes';
import { AddressRoutes } from '../pages/customer/CustomerAddressPage/Address.routes';
import { OrderDetailRoutes } from '../pages/customer/CustomerOrderDetailPage/OrderDetail.routes';
import { ProfileRoutes } from '../pages/customer/CustomerProfilePage/Profile.routes';
import { StoreDashboardRoutes } from '../pages/customer/StoreDashboardPage/Dashboard.routes';
import { StoreOrderRoutes } from '../pages/customer/StoreOrderPage/StoreOrder.routes';
import { StoreProfileRoutes } from '../pages/customer/StoreProfilePage/StoreProfile.routes';
import { StoreReviewRoutes } from '../pages/customer/StoreReviewPage/StoreReview.routes';
import { StoreOrderDetailRoutes } from '../pages/customer/StoreOrderDetailPage/StoreOrderDetail.routes';
import { StoreProductsRoutes } from '../pages/customer/StoreProductsPage/StoreProducts.routes';
import { StoreProductsDetailRoutes } from '../pages/customer/StoreProductDetailPage/StoreProductDetail.routes';

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
        children: [adminRoutes, CartPageRoutes, ChekoutPageRoutes, StoreRegisterPageRoutes, UploadProductPageRoutes],
      },
      {
        path: accountUrls.accountUrl,
        element: <Account />,
        children: [
          ProfileRoutes,
          AddressRoutes,
          MyOrdersRoutes,
          MyReviewsRoutes,
          OrderDetailRoutes,
          StoreDashboardRoutes,
          StoreOrderRoutes,
          StoreProfileRoutes,
          StoreReviewRoutes,
          StoreOrderDetailRoutes,
          StoreProductsRoutes,
          StoreProductsDetailRoutes
        ],
      },
    ],
  },
]);

export default routes;
