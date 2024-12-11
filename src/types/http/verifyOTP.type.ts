import { UserProps } from '../user.type';

export interface VerifyRequestProps extends Pick<UserProps, 'phoneNumber' | 'password' | 'otp'> {}
export interface VerifyResponseProps extends UserProps {}
