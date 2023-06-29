import { postDataRequest } from '../utils/ApiRequest';
import { authLogin, refreshTokenRequest } from '../types/AuthType';

export const loginService = async (data: authLogin) => {
    try {
        const path = `/Auth/login`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const refreshTokenService = async (data: refreshTokenRequest) => {
    try {
        console.log(data);

        const path = `/Auth/renew-token`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
};
