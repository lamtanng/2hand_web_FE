import { TokenProps } from '../token.type';

export interface RefreshTokenResponseProps extends Pick<TokenProps, 'accessToken'> {}
