import { authPaths } from '../constants/apiPaths/authPaths';
import { LoginRequestProps, LoginResponseProps } from '../types/http/login.typs';
import { RefreshTokenResponseProps } from '../types/http/token.type';
import { axiosClient } from './axios';
import { baseURL, headers, timeout, withCredentials } from './axios.constants';

const getAuthUrl = (url: string) => `${authPaths.authPath}/${url}`;
const loginUrl = getAuthUrl(authPaths.loginPath);
const refreshTokenUrl = getAuthUrl(authPaths.refreshPath);
const logoutUrl = getAuthUrl(authPaths.logoutPath);

function login(data: LoginRequestProps) {
  return axiosClient.post<LoginResponseProps>(loginUrl, data);
}

function refreshToken() {
  return axiosClient.put<RefreshTokenResponseProps>(refreshTokenUrl, { baseURL, timeout, headers, withCredentials });
}

function logout() {
  return axiosClient.delete(logoutUrl);
}

export const authAPIs = { login, logout, refreshToken };
