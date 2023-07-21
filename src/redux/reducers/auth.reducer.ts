import { createReducer } from '@reduxjs/toolkit';
import { accountInformation } from '../../types/AccountType';
import { ApiResponse } from '../../types/ApiType';

interface authState {
    isLogin: boolean;
    isAdmin: boolean;
    userData: ApiResponse<accountInformation>[];
}

const initialState = {
    isLogin: false,
    isAdmin: false,
    userData: [],
};

const authReducer = createReducer(initialState, (builder) => {});

export default authReducer;
