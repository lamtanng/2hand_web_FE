import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginRoute } from '../pages/LoginPage/Login.routes';
import { adminRoutes } from './admin.routes';
import { ProtectedRoutes } from '../components/layouts/ProtectedRoutes';
import { HomePageRoutes } from '../pages/HomePage/HomePage.routes';
import { SignupRoute } from '../pages/SignupPage/Signup.routes';
import Account from '../pages/customer/AccountPage';
import { ProfileRoutes } from '../pages/customer/AccountPage/Profile/Profile.routes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      HomePageRoutes,
      LoginRoute,
      SignupRoute,
      {
        element: <ProtectedRoutes />,
        children: [adminRoutes],
      },
      {
        path: '/account',
        element: <Account />,
        children: [
          ProfileRoutes,
        ]
      },
    ],
  },
]);

export default routes;
