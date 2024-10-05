import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginRoute } from '../pages/LoginPage/Login.routes';
import { adminRoutes } from './admin.routes';
import { ProtectedRoutes } from '../components/layouts/ProtectedRoutes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      LoginRoute,
      {
        element: <ProtectedRoutes />,
        children: [adminRoutes],
      },
    ],
  },
]);

export default routes;
