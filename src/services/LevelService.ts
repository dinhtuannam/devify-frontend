import { getDataRequest } from '../utils/ApiRequest';

export const getAllLevelService = async () => {
    try {
        const path = `/level`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
