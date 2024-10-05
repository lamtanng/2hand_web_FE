import axios, { AxiosError } from 'axios';
import { baseURL, headers, timeout, withCredentials } from './axios.constants';

const axiosClient = axios.create({ baseURL, timeout, headers, withCredentials });

axiosClient.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // const prevRequest = error?.config;

    // if (error?.response?.status === 401 && error.response?.statusText === 'Unauthorized' && prevRequest !== undefined) {
    //   const newReq = await refresh();
    //   prevRequest.headers.Authorization = `Bearer ${newReq.accessToken}`;
    //   return axiosPrivate(prevRequest);
    // }
    return Promise.reject(error.response?.data);
  },
);

export { axiosClient };
