import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
// import { Role } from '../../../types/enum/role.enum';
import { authPaths } from '../../../constants/apiPaths/authPaths';

export const ProtectedAdminRoutes = () => {
  const {
    user: { roleID },
  } = useAppSelector(loginSelector);

  console.log(roleID);

  const isAdmin = roleID ? roleID.includes('67024402b78fc702e7dad5f2') : false;

  console.log(isAdmin);

  return isAdmin ? <Outlet /> : <Navigate to={`/${authPaths.loginPath}`} replace />;
};
