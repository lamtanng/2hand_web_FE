import { RouteObject } from "react-router-dom";
import { accountUrls } from "../constants/urlPaths/customer/accountUrls";
import Account from "../pages/customer/AccountPage";
import { ProfileRoutes } from "../pages/customer/CustomerProfilePage/Profile.routes";
import { AddressRoutes } from "../pages/customer/CustomerAddressPage/Address.routes";
import { MyReviewsRoutes } from "../pages/customer/CustomerReviewPage/MyReviews.routes";
import { MyOrdersRoutes } from "../pages/customer/CustomerOrderPage/MyOrder.routes";
import { OrderDetailRoutes } from "../pages/customer/CustomerOrderDetailPage/OrderDetail.routes";
import { StoreDashboardRoutes } from "../pages/customer/StoreDashboardPage/Dashboard.routes";
import { StoreOrderRoutes } from "../pages/customer/StoreOrderPage/StoreOrder.routes";
import { StoreProfileRoutes } from "../pages/customer/StoreProfilePage/StoreProfile.routes";
import { StoreProductsDetailRoutes } from "../pages/customer/StoreProductDetailPage/StoreProductDetail.routes";
import { StoreProductsRoutes } from "../pages/customer/StoreProductsPage/StoreProducts.routes";
import { StoreOrderDetailRoutes } from "../pages/customer/StoreOrderDetailPage/StoreOrderDetail.routes";
import { StoreReviewRoutes } from "../pages/customer/StoreReviewPage/StoreReview.routes";
import { WishlistRoutes } from "../pages/customer/CustomerWishlistPage/CustomerWishlistPage.routes";
import { NotificationsRoutes } from "../pages/customer/NotificationPage/NotificationPage.routes";

export const accountRoutes: RouteObject = {
    path: accountUrls.accountUrl,
        element: <Account />,
        children: [
          ProfileRoutes,
          AddressRoutes,
          MyOrdersRoutes,
          MyReviewsRoutes,
          OrderDetailRoutes,
          WishlistRoutes,
          StoreDashboardRoutes,
          StoreOrderRoutes,
          StoreProfileRoutes,
          StoreReviewRoutes,
          StoreOrderDetailRoutes,
          StoreProductsRoutes,
          StoreProductsDetailRoutes,
          NotificationsRoutes
        ],
  };