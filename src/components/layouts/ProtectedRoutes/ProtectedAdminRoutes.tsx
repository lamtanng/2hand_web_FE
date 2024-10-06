import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { Role } from '../../../types/enum/role.enum';
import { authPaths } from '../../../constants/apiPaths/authPaths';

export const ProtectedAdminRoutes = () => {
  const {
    user: { role },
  } = useAppSelector(loginSelector);

  const isAdmin = role ? role.includes(Role.User) : false;
  return isAdmin ? <Outlet /> : <Navigate to={`/${authPaths.loginPath}`} replace />;
};
