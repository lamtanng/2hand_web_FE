import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyleProvider } from '@ant-design/cssinjs';

export default function App() {
  return (
    <StyleProvider hashPriority="low" >
      <div className="overflow-hidden text-base">
        <ToastContainer
          position="top-right"
          transition={Bounce}
          autoClose={2000}
          draggable={true}
          theme="colored"
          hideProgressBar={true}
          toastClassName="!font-sans !rounded-md"
        />
        <Outlet />
      </div>
    </StyleProvider>
  );
}
