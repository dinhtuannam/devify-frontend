import { ApiResponse } from '../types/ApiType';
import { CreatorCoursesDTO, DetailCreatorPublicDTO } from '../types/CreatorType';
import { getDataRequest } from '../utils/ApiRequest';

export const getCreatorBySlug = async (slug: string | undefined) => {
    try {
        const path = `/creator/slug/${slug}`;
        const response: ApiResponse<DetailCreatorPublicDTO> = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getCreatorCoursesBySlug = async (slug: string | undefined) => {
    try {
        const path = `/creator/slug/${slug}/courses`;
        const response: ApiResponse<CreatorCoursesDTO[]> = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
