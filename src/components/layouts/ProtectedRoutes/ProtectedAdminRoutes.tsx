import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { Role } from '../../../types/enum/role.enum';

export const ProtectedAdminRoutes = () => {
  const {
    user: { role },
  } = useAppSelector(loginSelector);

  const isAdmin = role ? role.includes(Role.User) : false;
  //if not admin, redirect to home page
  return isAdmin ? <Outlet /> : <Navigate to={'/login'} replace />;
};
