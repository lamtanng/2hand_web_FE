import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginRoute } from '../pages/LoginPage/Login.routes';
import { adminRoutes } from './admin.routes';
import { ProtectedRoutes } from '../components/layouts/ProtectedRoutes';
import { HomePageRoutes } from '../pages/HomePage/HomePage.routes';
import { SignupRoute } from '../pages/SignupPage/Signup.routes';
import { ProductListRoutes } from '../pages/ProductList/ProductList.routes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      HomePageRoutes,
      ProductListRoutes,
      LoginRoute,
      SignupRoute,
      {
        element: <ProtectedRoutes />,
        children: [adminRoutes],
      },
    ],
  },
]);

export default routes;
