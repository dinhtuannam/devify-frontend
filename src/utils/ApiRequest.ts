import axios from 'axios';

export const backendRequest = axios.create({
    baseURL: 'https://localhost:7221/api',
});

export const getDataRequest = async (path: string, option = {}) => {
    try {
        const response = await backendRequest.get(path, option);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const postDataRequest = async (path: string, option = {}) => {
    try {
        const response = await backendRequest.post(path, option);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};
