import axios from 'axios';

export const backendRequest = axios.create({
    baseURL: 'https://localhost:7264/',
});

export const getDataRequest = async (path: string, option = {}) => {
    try {
        const response = await backendRequest.get(path, option);
        return response.data;
    } catch (e) {
        console.log(e);
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
