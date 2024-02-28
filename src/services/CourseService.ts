import { DataList } from '../types/ApiType';
import { CourseItem, DetailCourse } from '../types/CourseType';
import { getDataRequest } from '../utils/ApiRequest';
import { ApiResponse } from '../types/ApiType';

export const getViewCourseService = async (code: string | undefined) => {
    const path = `/course/${code}/get-view-info-course`;
    const response: ApiResponse<DetailCourse> = await getDataRequest(path);
    return response;
};

export const getDetailCourseService = async (code: string) => {
    const path = `/course/${code}/get-course`;
    const response: ApiResponse<DetailCourse> = await getDataRequest(path);
    return response;
};

export interface FilterCourse {
    query: string | null;
    page: number | null;
    cat?: string[];
    lang?: string[];
    lvl?: string[];
}

export const getfilterCourseService = async (params: FilterCourse) => {
    try {
        let path = '/course/get-all-course';

        const queryStringParams: string[] = [];
        if (params.query) queryStringParams.push(`query=${encodeURIComponent(params.query)}`);
        if (params.page) queryStringParams.push(`page=${encodeURIComponent(params.page)}`);
        if (params.cat) params.cat.forEach((cat) => queryStringParams.push(`cat=${encodeURIComponent(cat)}`));
        if (params.lang) params.lang.forEach((lang) => queryStringParams.push(`lang=${encodeURIComponent(lang)}`));
        if (params.lvl) params.lvl.forEach((lvl) => queryStringParams.push(`lvl=${encodeURIComponent(lvl)}`));

        const queryString = queryStringParams.join('&');

        if (queryString) {
            path += `?${queryString}`;
        }
        const response: ApiResponse<DataList<CourseItem>> = await getDataRequest(path);
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};
