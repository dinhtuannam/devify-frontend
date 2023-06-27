import { postDataRequest } from '../utils/ApiRequest';
import { authLogin, tokenResponse } from '../types/AuthType';

export const loginService = async (data: authLogin) => {
    try {
        const path = `/Auth/login`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const refreshTokenService = async (data: tokenResponse) => {
    try {
        const path = `/Auth/renew-token`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
};
