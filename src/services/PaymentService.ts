import { ApiResponse } from '../types/ApiType';
import { postDataRequest } from '../utils/ApiRequest';

export const checkoutService = async () => {
    const response: ApiResponse<string> = await postDataRequest('/payment/vnpay');
    if (response.code === 200) {
        window.location.href = response.data;
    }
    return response;
};
