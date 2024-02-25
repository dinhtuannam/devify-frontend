import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../types/ApiType';
import { AsyncState } from '../../../types/StateType';
import { UserProfile } from '../../../types/UserType';
import { getUserProfileService } from '../../../services/UserService';

const EmptyUserProfile: UserProfile = {
    information: {
        code: '',
        username: '',
        displayName: '',
        email: '',
        image: '',
        about: '',
        social: '',
        role: '',
        isbanned: false,
        createTime: '',
        updateTime: '',
    },
    courses: [],
};

const initialState: AsyncState<UserProfile> = {
    isLoading: false,
    code: 0,
    result: false,
    message: '',
    data: EmptyUserProfile,
};

export const getUserProfileThunk = createAsyncThunk('getUserProfileThunk', async () => {
    const response = await getUserProfileService();
    return response;
});

export const getUserProfileSlice = createSlice({
    name: 'get-user-profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfileThunk.pending, (state) => {
                state.isLoading = true;
                state.result = false;
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action: PayloadAction<ApiResponse<UserProfile>>) => {
                state.isLoading = false;
                state.result = action.payload?.result;
                state.message = action.payload?.message;
                state.code = action.payload?.code;
                state.data = action.payload?.data;
            })
            .addCase(getUserProfileThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.result = false;
                state.code = 400;
            });
    },
});

const userProfileReducer = getUserProfileSlice.reducer;
export default userProfileReducer;
