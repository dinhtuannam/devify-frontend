import { getDataRequest } from '../utils/ApiRequest';

export const getAllLanguageService = async () => {
    try {
        const path = `/language/get-all-language`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
