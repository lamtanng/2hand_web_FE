import { UserProps } from '../user.type';
import { TokenProps } from '../token.type';

export interface LoginRequestProps extends Pick<UserProps, 'phoneNumber' | 'password'> {}
export interface LoginResponseProps extends TokenProps {}
