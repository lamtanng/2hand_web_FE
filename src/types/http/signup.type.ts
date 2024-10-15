import { UserProps } from '../user.type';

export interface SignupRequestProps extends Pick<UserProps, 'email' | 'password' | 'confirmPassword'> {}
export interface SignupResponseProps extends UserProps {}
