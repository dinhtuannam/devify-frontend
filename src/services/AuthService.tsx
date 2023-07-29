import { postDataRequest } from '../utils/ApiRequest';
import { authLogin, refreshTokenRequest } from '../types/AuthType';

export const loginService = async (data: authLogin) => {
    try {
        const path = `/auth/login`;
        const response = await postDataRequest(path, data);
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const refreshTokenService = async (data: refreshTokenRequest) => {
    try {
        console.log(data);
        const path = `/auth/renew-token`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
};
