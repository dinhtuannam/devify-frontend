import { deleteDataRequest, getDataRequest, postDataRequest } from '../utils/ApiRequest';
import { ApiResponse } from '../types/ApiType';
import { CartItem } from '../types/CartType';

export const getUserCart = async () => {
    const path = `/cart/get-cart`;
    const response: ApiResponse<CartItem> = await getDataRequest(path);
    return response;
};

export const addItemToCart = async (course: string) => {
    const path = `/cart/add-item/${course}`;
    const response: ApiResponse<CartItem> = await postDataRequest(path);
    return response;
};

export const removeItemFromCart = async (course: string) => {
    const path = `/cart/remove-item/${course}`;
    const response: ApiResponse<CartItem> = await deleteDataRequest(path);
    return response;
};

export const addDiscountToCart = async (discount: string) => {
    const path = `/cart/apply-discount/${discount}`;
    const response: ApiResponse<CartItem> = await postDataRequest(path);
    return response;
};

export const removeDiscountFromCart = async (discount: string) => {
    const path = `/cart/remove-discount/${discount}`;
    const response: ApiResponse<CartItem> = await deleteDataRequest(path);
    return response;
};
