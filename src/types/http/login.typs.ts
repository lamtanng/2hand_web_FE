import { AccountProps } from '../account.type';
import { TokenProps } from '../token.type';

export interface LoginRequestProps extends Pick<AccountProps, 'email' | 'password'> {}
export interface LoginResponseProps extends TokenProps {}
