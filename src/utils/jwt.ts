import { jwtDecode } from 'jwt-decode';
import { UserProps } from '../types/user.type';
export const decodeToken = (accessToken: string): UserProps => jwtDecode(accessToken);
