import { UserProps } from '../user.type';

export interface SignupRequestProps extends Pick<UserProps, 'phoneNumber' | 'password' | 'confirmPassword'> {}
export interface SignupResponseProps extends UserProps {}
