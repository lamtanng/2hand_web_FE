import { authPaths } from '../constants/apiPaths/authPaths';
import { LoginRequestProps, LoginResponseProps } from '../types/http/login.typs';
import { axiosClient } from './axios';

const getAuthUrl = (url: string) => `${authPaths.authPath}/${url}`;
const loginUrl = getAuthUrl(authPaths.loginPath);
const refreshTokenUrl = getAuthUrl(authPaths.loginPath);
const logoutUrl = getAuthUrl(authPaths.loginPath);

function login(data: LoginRequestProps) {
  return axiosClient.post<LoginResponseProps>(loginUrl, data);
}

function refreshToken() {
  return axiosClient.post(refreshTokenUrl);
}

function logout() {
  return axiosClient.delete(logoutUrl);
}

export const authAPIs = { login, logout, refreshToken };
