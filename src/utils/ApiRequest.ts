import axios from 'axios';
import Cookies from 'js-cookie';
const baseURL = 'https://localhost:7221/api';

export const backendRequest = axios.create({
    baseURL: baseURL,
});

backendRequest.interceptors.request.use(
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

export const getDataRequest = async (path: string, option = {}) => {
    try {
        let response = await backendRequest.get(path, option);
        return response.data;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        return null;
    }
};

export const postDataRequest = async (path: string, option = {}) => {
    try {
        let response = await backendRequest.post(path, option);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};
