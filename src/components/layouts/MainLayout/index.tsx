import { Outlet } from 'react-router-dom';
import Footer from '../../elements/Footer';
import { ReactNode, useEffect } from 'react';
import { loginSelector, storeAuth } from '../../../redux/slices/login.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { token } = useAppSelector(loginSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token?.accessToken) {
      //get access token from local storage
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        dispatch(storeAuth({ data: { accessToken } }));
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
