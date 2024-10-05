import { jwtDecode } from 'jwt-decode';
import { AccountProps } from '../types/account.type';
export const decodeToken = (accessToken: string): AccountProps => jwtDecode(accessToken);
