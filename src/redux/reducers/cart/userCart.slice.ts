import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../types/ApiType';
import { CartItem } from '../../../types/CartType';
import {
    addDiscountToCart,
    addItemToCart,
    getUserCart,
    removeDiscountFromCart,
    removeItemFromCart,
} from '../../../services/CartService';

interface CartReduxState {
    alert: boolean;
    loading: boolean;
    result: boolean;
    message: string;
    data: CartItem;
}

export const emptyCartItem: CartItem = {
    amount: 0,
    discount_price: 0,
    total: 0,
    user: {
        code: '',
        username: '',
        displayName: '',
        image: '',
    },
    discount: {
        code: '',
        name: '',
        des: '',
        value: 0,
        type: 0,
        quantity: 0,
        minimum: 0,
        expiredTime: '',
    },
    items: [],
};

const initialState: CartReduxState = {
    alert: false,
    loading: false,
    result: false,
    message: '',
    data: emptyCartItem,
};

export const getUserCartRedux = createAsyncThunk('getUserCartRedux', async () => {
    const response = await getUserCart();
    return response;
});

export const addItemToCartRedux = createAsyncThunk('addItemToCartRedux', async (course: string) => {
    const response = await addItemToCart(course);
    return response;
});

export const removeItemFromCartRedux = createAsyncThunk('removeItemFromCartRedux', async (course: string) => {
    const response = await removeItemFromCart(course);
    return response;
});

export const addDiscountToCartRedux = createAsyncThunk('addDiscountToCartRedux', async (discount: string) => {
    const response = await addDiscountToCart(discount);
    return response;
});

export const removeDiscountFromCartRedux = createAsyncThunk('removeDiscountFromCartRedux', async (discount: string) => {
    const response = await removeDiscountFromCart(discount);
    return response;
});

export const userCartSlice = createSlice({
    name: 'user-cart-slice',
    initialState,
    reducers: {
        showCartAlert: (state) => {
            state.alert = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // *********** get cart
            .addCase(getUserCartRedux.pending, (state) => {
                state.loading = true;
                state.result = false;
                state.alert = false;
                state.alert = false;
            })
            .addCase(getUserCartRedux.fulfilled, (state, action: PayloadAction<ApiResponse<CartItem>>) => {
                state.loading = false;
                state.result = action.payload.result;
                state.message = action.payload.message;
                state.data = action.payload.data;
                state.alert = false;
            })
            .addCase(getUserCartRedux.rejected, (state, action) => {
                state.loading = false;
                state.result = false;
                state.message = '';
                state.alert = false;
            })

            // *********** add item to cart
            .addCase(addItemToCartRedux.pending, (state) => {
                state.loading = true;
                state.result = false;
                state.alert = false;
            })
            .addCase(addItemToCartRedux.fulfilled, (state, action: PayloadAction<ApiResponse<CartItem>>) => {
                state.loading = false;
                state.result = action.payload.result;
                state.message = action.payload.message;
                state.data = action.payload.data;
                state.alert = true;
            })
            .addCase(addItemToCartRedux.rejected, (state, action) => {
                state.loading = false;
                state.result = false;
                state.message = '';
                state.alert = false;
            })

            // *********** remove item from cart
            .addCase(removeItemFromCartRedux.pending, (state) => {
                state.loading = true;
                state.result = false;
                state.alert = false;
            })
            .addCase(removeItemFromCartRedux.fulfilled, (state, action: PayloadAction<ApiResponse<CartItem>>) => {
                state.loading = false;
                state.result = action.payload.result;
                state.message = action.payload.message;
                state.data = action.payload.data;
                state.alert = true;
            })
            .addCase(removeItemFromCartRedux.rejected, (state, action) => {
                state.loading = false;
                state.result = false;
                state.message = '';
                state.alert = false;
            })

            // *********** add discount to cart
            .addCase(addDiscountToCartRedux.pending, (state) => {
                state.loading = true;
                state.result = false;
                state.alert = false;
            })
            .addCase(addDiscountToCartRedux.fulfilled, (state, action: PayloadAction<ApiResponse<CartItem>>) => {
                state.loading = false;
                state.result = action.payload.result;
                state.message = action.payload.message;
                if (action.payload.result) {
                    state.data = action.payload.data;
                }
                state.alert = true;
            })
            .addCase(addDiscountToCartRedux.rejected, (state, action) => {
                state.loading = false;
                state.result = false;
                state.message = '';
                state.alert = false;
            })

            // *********** remove discount from cart
            .addCase(removeDiscountFromCartRedux.pending, (state) => {
                state.loading = true;
                state.result = false;
                state.alert = false;
            })
            .addCase(removeDiscountFromCartRedux.fulfilled, (state, action: PayloadAction<ApiResponse<CartItem>>) => {
                state.loading = false;
                state.result = action.payload.result;
                state.message = action.payload.message;
                state.data = action.payload.data;
                state.alert = true;
            })
            .addCase(removeDiscountFromCartRedux.rejected, (state, action) => {
                state.loading = false;
                state.result = false;
                state.message = '';
                state.alert = false;
            });
    },
});

export const { showCartAlert } = userCartSlice.actions;
const userCartReducer = userCartSlice.reducer;
export default userCartReducer;
