import { getDataRequest } from '../utils/ApiRequest';

export const getAccountInfoService = async (id: string) => {
    try {
        const path = `/Account/get-user-information?id=${id}`;
        const option = {};
        const isAuthorize: boolean = true;
        const response = await getDataRequest(path, option, isAuthorize);
        return response;
    } catch (e) {
        console.log(e);
    }
};
