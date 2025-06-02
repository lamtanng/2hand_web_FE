import { Outlet } from 'react-router-dom';
import Footer from '../../elements/Footer';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
