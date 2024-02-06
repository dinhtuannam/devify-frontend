import { ApiResponse, DataList } from '../types/ApiType';
import { CourseItem } from '../types/CourseType';
import { CreatorCoursesDTO, DetailCreatorPublicDTO } from '../types/CreatorType';
import { UserItem } from '../types/UserType';
import { getDataRequest } from '../utils/ApiRequest';

export const getCreator = async (code: string | undefined) => {
    try {
        const path = `/account/${code}/get-user`;
        const response: ApiResponse<UserItem> = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getCreatorCourses = async (code: string | undefined) => {
    try {
        const path = `/account/${code}/get-creator-courses`;
        const response: ApiResponse<DataList<CourseItem>> = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
