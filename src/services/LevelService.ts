import { ApiResponse } from '../types/ApiType';
import { LevelItem } from '../types/LevelType';
import { getDataRequest } from '../utils/ApiRequest';

export const getAllLevelService = async () => {
    const path = `/level/get-all-level`;
    const response: ApiResponse<LevelItem[]> = await getDataRequest(path);
    return response;
};
