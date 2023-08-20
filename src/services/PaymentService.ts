import { postDataRequest } from '../utils/ApiRequest';

export const paymentService = async () => {
    try {
        const response = await postDataRequest('/payment/vnpay', {
            OrderType: 'abc',
            Amount: 300000,
            OrderDescription: 'abc',
            Name: 'abc',
        });
        return response;
    } catch (e) {
        console.log(e);
    }
};
