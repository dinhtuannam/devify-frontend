import { getDataRequest } from '../utils/ApiRequest';

export const getDetailCourse = async (name: string | undefined) => {
    try {
        const path = `/course/get-course-by-slug?slug=${name}`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
