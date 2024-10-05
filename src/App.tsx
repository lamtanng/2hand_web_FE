import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="mx-auto max-w-screen-2xl overflow-hidden text-base">
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
  );
}
