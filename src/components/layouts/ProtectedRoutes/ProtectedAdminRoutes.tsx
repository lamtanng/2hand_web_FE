import { Outlet } from 'react-router-dom';

export const ProtectedAdminRoutes = () => {
  //check if role is admin

  //if not admin, redirect to home page

  return <Outlet />;
};
