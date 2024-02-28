import { postDataRequest } from '../utils/ApiRequest';
import { LoginPayload, LoginResponse } from '../types/AuthType';
import { ApiResponse } from '../types/ApiType';

export const loginService = async (data: LoginPayload) => {
    const path = `/User/sign-in`;
    const response: ApiResponse<LoginResponse> = await postDataRequest(path, data);
    if (response.result) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.info));
    }
    return response;
};

export const refreshTokenService = async (token: string) => {
    try {
        const path = `/User/${token}/renew-token`;
        const response = await postDataRequest(path, token);
        return response;
    } catch (e) {
        console.log(e);
    }
};
