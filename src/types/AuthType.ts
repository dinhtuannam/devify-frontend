import { currentUserType } from './AccountType';
export interface authLogin {
    name: string;
    password: string;
}

export interface authLoginResponse {
    success: boolean;
    message: string;
    data: tokenResponse;
}

export interface tokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface decodeToken {
    Id: string;
    RoleId: string;
    email: string;
    exp: number;
    iat: number;
    jti: string;
    nbf: number;
    unique_name: string;
}

export interface refreshTokenRequest {
    refreshToken: string;
}

export interface loginResponse {
    accessToken: string;
    refreshToken: string;
    info: currentUserType;
}
