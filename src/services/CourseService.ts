import { DataList } from '../types/ApiType';
import { SearchCourseListType } from '../types/CourseType';
import { getDataRequest } from '../utils/ApiRequest';
import { ApiResponse } from '../types/ApiType';

export const getDetailCourseService = async (name: string | undefined) => {
    try {
        const path = `/course/slug/${name}`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};

interface FilterCourse {
    query: string | null;
    page: number | null;
    cat?: string[];
    lang?: string[];
    lvl?: string[];
}

export const getfilterCourseService = async (params: FilterCourse) => {
    try {
        let path = '/course/search/';

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
        const response: ApiResponse<DataList<SearchCourseListType[]>> = await getDataRequest(path);
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};
