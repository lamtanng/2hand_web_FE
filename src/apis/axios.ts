import axios, { AxiosError } from 'axios';
import { baseURL, headers, timeout, withCredentials } from './axios.constants';
import { authAPIs } from './auth.api';
import { handleError } from '../utils/handleError';
import { authPaths } from '../constants/apiPaths/authPaths';

const axiosClient = axios.create({ baseURL, timeout, headers, withCredentials });

axiosClient.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error),
);

//handle loop request when token is expired (Closure in JS)
let refreshTokenRequest: any = null;

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // unauthorized
    if (error.response?.status === 401) handleLogout();
    //token is expired
    const prevRequest = error?.config;
    if (error?.response?.status === 410 && prevRequest) {
      try {
        // prevent multiple request
        // if refreshTokenRequest is null, call refreshToken API to get new token
        // if refreshTokenRequest is not null, wait until refreshTokenRequest is resolved
        // Ref: https://www.youtube.com/watch?v=cI_xxZDYYPg
        refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : authAPIs.refreshToken();
        const newToken = await refreshTokenRequest;
        prevRequest.headers.Authorization = `Bearer ${newToken.data.accessToken}`;
        return axiosClient(prevRequest);
      } catch (error: AxiosError | any) {
        handleLogout();
      } finally {
        // reset refreshTokenRequest to null
        refreshTokenRequest = null;
      }
    }

    return Promise.reject(error.response?.data);
  },
);

const handleLogout = async () => {
  try {
    await authAPIs.logout();
  } catch (error: AxiosError | any) {
    handleError(error);
  } finally {
    location.href = `/${authPaths.loginPath}`;
  }
};

export { axiosClient };
