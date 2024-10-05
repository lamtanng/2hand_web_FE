import axios, { AxiosError } from 'axios';
import { baseURL, headers, timeout, withCredentials } from './axios.constants';
import { authAPIs } from './auth.api';
import { handleError } from '../utils/handleError';

const axiosClient = axios.create({ baseURL, timeout, headers, withCredentials });

axiosClient.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // unauthorized
    if (error.response?.status === 401) {
      handleLogout();
    }

    //token is expired
    const prevRequest = error?.config;
    if (error?.response?.status === 410 && prevRequest) {
      try {
        // prevRequest?._retry = true;
        const newReq = await authAPIs.refreshToken();
        console.log('newReq', newReq);
        prevRequest.headers.Authorization = `Bearer ${newReq.data.accessToken}`;
        return axiosClient(prevRequest);
      } catch (error: AxiosError | any) {
        handleLogout();
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
    location.href = '/login';
  }
};

export { axiosClient };
