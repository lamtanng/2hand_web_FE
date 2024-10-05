import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/system';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import theme from './constants/theme.ts';
import './output.css';
import { store } from './redux/store.ts';
import routes from './routes/index.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-qxy11le1mp840c2l.us.auth0.com"
    clientId="RVHie5gQn7Xz7wuuWLlwzs4Tww6Mn5YZ"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </Provider>
  </Auth0Provider>,
  // </React.StrictMode>,
);
