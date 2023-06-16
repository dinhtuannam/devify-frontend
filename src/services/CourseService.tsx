import { getDataRequest } from '../utils/ApiRequest';

export const getDetailCourse = async (name: string | undefined) => {
    try {
        const path = `/Course/get-detail-course?name=${name}`;
        console.log(path);

        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
