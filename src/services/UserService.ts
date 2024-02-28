import { ApiResponse } from '../types/ApiType';
import { CourseItem } from '../types/CourseType';
import { CreateUser, UpdateUser, UserItem, UserProfile } from '../types/UserType';
import { getDataRequest, postDataRequest, putDataRequest } from '../utils/ApiRequest';

export const getCurrentUserService = async (id: string) => {
    try {
        const path = `/user/${id}/current`;
        const response = await getDataRequest(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getInventoryService = async () => {
    try {
        const path = `/user/get-inventory`;
        const response: ApiResponse<CourseItem[]> = await getDataRequest(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getUserProfileService = async () => {
    const path = `/user/get-profile`;
    const response: ApiResponse<UserProfile> = await getDataRequest(path, {});
    if (response.code === 401) {
        window.location.href = '/login';
    }
    return response;
};

export const createUserService = async (data: CreateUser) => {
    const path = `/user/create-new-user`;
    const response: ApiResponse<string> = await postDataRequest(path, data);
    return response;
};

export const editUserService = async (data: UpdateUser) => {
    const path = `/user/edit-user`;
    const response: ApiResponse<UserItem> = await putDataRequest(path, data);
    if (response.result) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
    }
    return response;
};
