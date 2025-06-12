import { authPaths } from '../constants/apiPaths/authPaths';
import { LoginRequestProps, LoginResponseProps } from '../types/http/login.type';
import { ResendOTPRequestProps } from '../types/http/resendOTP.type';
import { SignupRequestProps } from '../types/http/signup.type';
import { RefreshTokenResponseProps } from '../types/http/token.type';
import { VerifyRequestProps } from '../types/http/verifyOTP.type';
import { axiosClient } from './axios';
import { baseURL, headers, withCredentials } from './axios.constants';

const getAuthUrl = (url: string) => `${authPaths.authPath}/${url}`;
const loginUrl = getAuthUrl(authPaths.loginPath);
const refreshTokenUrl = getAuthUrl(authPaths.refreshPath);
const logoutUrl = getAuthUrl(authPaths.logoutPath);
const signupUrl = getAuthUrl(authPaths.signupPath);
const verifypUrl = getAuthUrl(authPaths.verifyOTPPath);
const sendOTPUrl = getAuthUrl(authPaths.sendOTPPath);

function login(data: LoginRequestProps) {
  return axiosClient.post<LoginResponseProps>(loginUrl, data);
}

function refreshToken() {
  return axiosClient.put<RefreshTokenResponseProps>(refreshTokenUrl, { baseURL, headers, withCredentials });
}

function logout() {
  return axiosClient.delete(logoutUrl);
}

function signup(data: SignupRequestProps) {
  return axiosClient.post(signupUrl, data)
}

function verifyOTP(data: VerifyRequestProps){
  return axiosClient.post(verifypUrl, data);
}

function sendOTP(data: ResendOTPRequestProps){
  return axiosClient.post(sendOTPUrl, data);
}

export const authAPIs = { login, logout, refreshToken, signup, verifyOTP, sendOTP };
