import { ApiResponse } from '../types/ApiType';
import { CategoryItem } from '../types/CategoryType';
import { getDataRequest } from '../utils/ApiRequest';

export const getAllCategoryService = async () => {
    const path = `/category/get-all-category`;
    const response: ApiResponse<CategoryItem[]> = await getDataRequest(path);
    return response;
};
