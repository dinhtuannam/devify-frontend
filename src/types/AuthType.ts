import { UserItem } from './UserType';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface TokenItem {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    token: TokenItem;
    info: UserItem;
}

export interface AuthCookies {
    accessTokenCookie: string | undefined;
    refreshTokenCookie: string | undefined;
    isLoginCookies: string | undefined;
}
