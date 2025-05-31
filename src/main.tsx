import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './output.css';
import routes from './routes/index.tsx';
import Providers from './components/layouts/Providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={routes} />
  </Providers>,
);
