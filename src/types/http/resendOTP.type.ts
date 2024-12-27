import { UserProps } from '../user.type';

export interface ResendOTPRequestProps extends Pick<UserProps, 'phoneNumber'> {}
export interface ResendOTPResponseProps extends UserProps {}
