import { ApiResponse } from '../types/ApiType';
import { LanguageItem } from '../types/LanguageType';
import { getDataRequest } from '../utils/ApiRequest';

export const getAllLanguageService = async () => {
    const path = `/language/get-all-language`;
    const response: ApiResponse<LanguageItem[]> = await getDataRequest(path);
    return response;
};
