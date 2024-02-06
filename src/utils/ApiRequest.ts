import axios from 'axios';
import Cookies from 'js-cookie';
import { accessTokenUtil, isLoginUtil, refreshTokenUtil } from './AuthUtils';
import { ApiResponse } from '../types/ApiType';
import { TokenItem } from '../types/AuthType';
import { RemoveAllCookies } from '../helpers/cookiesHelper';
const baseURL = 'http://localhost:5000/api';

export const backendRequest = axios.create({
    baseURL: baseURL,
});

let renewingToken = false;

backendRequest.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
        config.headers['SameSite'] = 'None';
        config.headers['Secure'] = true;
        let accessToken = Cookies.get(accessTokenUtil);
        const refreshToken = Cookies.get(refreshTokenUtil);
        const isLogin = Cookies.get(isLoginUtil);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (accessToken === undefined && refreshToken !== undefined && isLogin !== undefined) {
            if (!renewingToken) {
                renewingToken = true;
                try {
                    const newToken = await renewAccessToken(refreshToken);

                    if (newToken !== null && newToken.accessToken !== '') {
                        config.headers.Authorization = `Bearer ${newToken.accessToken}`;
                    }
                } finally {
                    renewingToken = false;
                }
            } else {
                const timeoutPromise = new Promise<void>((resolve) => {
                    const timeoutId = setTimeout(() => {
                        resolve();
                    }, 10000);

                    const checkStatus = () => {
                        if (!renewingToken) {
                            clearTimeout(timeoutId);
                            resolve();
                        } else {
                            setTimeout(checkStatus, 1000);
                        }
                    };

                    checkStatus();
                });

                await timeoutPromise;

                accessToken = Cookies.get(accessTokenUtil);

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const renewAccessToken = async (token: string) => {
    try {
        const response = await fetch(`${baseURL}/account/${token}/renew-token`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                SameSite: 'None',
                Secure: 'true',
            },
        });

        const newToken: TokenItem = {
            accessToken: '',
            refreshToken: '',
        };

        if (!response.ok) {
            localStorage.clear();
            RemoveAllCookies();
            window.location.href = '/login';
            return newToken;
        }
        const res: ApiResponse<TokenItem> = await response.json();
        newToken.accessToken = res.data.accessToken;
        newToken.refreshToken = res.data.refreshToken;
        return newToken;
    } catch (error) {
        const newToken: TokenItem = {
            accessToken: '',
            refreshToken: '',
        };
        localStorage.clear();
        RemoveAllCookies();
        window.location.href = '/login';
        return newToken;
    }
};

export const getDataRequest = async (path: string, option = {}) => {
    try {
        let response = await backendRequest.get(path, option);
        return response.data;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};

export const postDataRequest = async (path: string, option = {}) => {
    try {
        let response = await backendRequest.post(path, option);
        return response.data;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};
