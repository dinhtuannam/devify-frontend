import { ApiResponse } from '../types/ApiType';
import { CourseItem } from '../types/CourseType';
import { UserProfile } from '../types/UserType';
import { getDataRequest } from '../utils/ApiRequest';

export const getCurrentUserService = async (id: string) => {
    try {
        const path = `/User/${id}/current`;
        const response = await getDataRequest(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getInventoryService = async () => {
    try {
        const path = `/User/get-inventory`;
        const response: ApiResponse<CourseItem[]> = await getDataRequest(path, {});

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getUserProfileService = async () => {
    const path = `/User/get-profile`;
    const response: ApiResponse<UserProfile> = await getDataRequest(path, {});
    if (response.code === 401) {
        window.location.href = '/login';
    }
    return response;
};
