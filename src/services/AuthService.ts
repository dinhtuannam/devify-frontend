import { postDataRequest } from '../utils/ApiRequest';
import { LoginPayload } from '../types/AuthType';

export const loginService = async (data: LoginPayload) => {
    try {
        const path = `/User/sign-in`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
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
