import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { Role } from '../../../types/enum/role.enum';

export const ProtectedAdminRoutes = () => {
  const {
    user: { roleID },
  } = useAppSelector(loginSelector);
  const isAdmin = roleID?.filter((role:any) => role.name === Role.Admin).length !== 0 ? true : false;
  return isAdmin ? <Outlet /> : <Navigate to={`/`} replace />;
};
