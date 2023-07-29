import { getDataRequest } from '../utils/ApiRequest';

export const getCurrentUserService = async (id: string) => {
    try {
        const path = `/account/get-current-user?id=${id}`;
        const response = await getDataRequest(path, {});
        return response;
    } catch (e) {
        console.log(e);
    }
};
