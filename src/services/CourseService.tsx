import { getDataRequest } from '../utils/ApiRequest';

export const getDetailCourseService = async (name: string | undefined) => {
    try {
        const path = `/course/slug/${name}`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getLearningCourseService = async (slug: string | undefined) => {
    try {
        const path = `/course/${slug}/learning`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
