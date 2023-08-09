import { getDataRequest } from '../utils/ApiRequest';

export const getCurrentUserService = async (id: string) => {
    try {
        const path = `/account/${id}/current`;
        const response = await getDataRequest(path, {});
        console.log(response);

        return response;
    } catch (e) {
        console.log(e);
    }
};
