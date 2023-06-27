import axios from 'axios';
import Cookies from 'js-cookie';
const baseURL = 'https://localhost:7221/api';

export const backendRequest = axios.create({
    baseURL: baseURL,
});

export const authorizationRequest = axios.create({
    baseURL: baseURL,
});

authorizationRequest.interceptors.request.use(
    (config) => {
        const token = Cookies.get('devify:AccessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const getDataRequest = async (path: string, option = {}, isAuthorize: boolean = false) => {
    try {
        let response;
        if (isAuthorize === false) response = await backendRequest.get(path, option);
        else response = await authorizationRequest.get(path, option);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const postDataRequest = async (path: string, option = {}, isAuthorize: boolean = false) => {
    try {
        let response;
        if (isAuthorize === false) response = await backendRequest.post(path, option);
        else response = await authorizationRequest.post(path, option);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};
