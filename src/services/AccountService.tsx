import { getDataRequest } from '../utils/ApiRequest';
import { accountInformationResponse } from '../types/AccountType';

export const getAccountInfoService = async (id: string) => {
    try {
        const path = `/Account/get-user-information?id=${id}`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
