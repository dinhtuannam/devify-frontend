import { postDataRequest } from '../utils/ApiRequest';
import { authLogin } from '../types/AuthType';

export const loginService = async (data: authLogin) => {
    try {
        const path = `/Auth/login`;
        const response = await postDataRequest(path, data);
        return response;
    } catch (e) {
        console.log(e);
    }
};
