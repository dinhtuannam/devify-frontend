import { getDataRequest } from '../utils/ApiRequest';

export const getAllCategoryService = async () => {
    try {
        const path = `/category/get-all-category`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
