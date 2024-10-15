import { UserProps } from '../user.type';

export interface VerifyRequestProps extends Pick<UserProps, 'email' | 'password' | 'otp'> {}
export interface VerifyResponseProps extends UserProps {}
