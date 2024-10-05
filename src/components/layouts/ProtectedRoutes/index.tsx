import { Outlet } from 'react-router-dom';
import { loginSelector, storeAuth } from '../../../redux/slices/login.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { authAPIs } from '../../../apis/auth.api';
import { handleError } from '../../../utils/handleError';

export const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(loginSelector);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const res = await authAPIs.refreshToken();
        dispatch(storeAuth(res));
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    !token?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};
