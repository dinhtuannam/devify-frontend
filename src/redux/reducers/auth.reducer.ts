import { createReducer } from '@reduxjs/toolkit';
import { accountInformationResponse } from '../../types/AccountType';

interface authState {
    isLogin: boolean;
    isAdmin: boolean;
    userData: accountInformationResponse[];
}

const initialState = {
    isLogin: false,
    isAdmin: false,
    userData: [],
};

const authReducer = createReducer(initialState, (builder) => {});

export default authReducer;
