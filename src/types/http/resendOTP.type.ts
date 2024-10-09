import { UserProps } from '../user.type';

export interface ResendOTPRequestProps extends Pick<UserProps, 'email'> {}
export interface ResendOTPResponseProps extends UserProps {}
