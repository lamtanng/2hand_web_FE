import React from 'react';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { store } from '../../../redux/store';
import theme from '../../../constants/theme';
import { NotificationProvider } from '../../../context/NotificationContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-qxy11le1mp840c2l.us.auth0.com"
      clientId="RVHie5gQn7Xz7wuuWLlwzs4Tww6Mn5YZ"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Provider store={store}>
        <StyleProvider>
          <ConfigProvider theme={theme}>
            <NotificationProvider>{children}</NotificationProvider>
          </ConfigProvider>
        </StyleProvider>
      </Provider>
    </Auth0Provider>
  );
};

export default Providers;
