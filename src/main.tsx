import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './output.css';
import { store } from './redux/store.ts';
import routes from './routes/index.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { ConfigProvider } from 'antd';
import theme from './constants/theme.ts';
import { StyleProvider } from '@ant-design/cssinjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-qxy11le1mp840c2l.us.auth0.com"
    clientId="RVHie5gQn7Xz7wuuWLlwzs4Tww6Mn5YZ"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Provider store={store}>
      <StyleProvider>
        <ConfigProvider theme={theme}>
          <RouterProvider router={routes} />
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  </Auth0Provider>,
  // </React.StrictMode>,
);
