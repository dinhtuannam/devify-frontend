import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../types/ApiType';
import { AsyncState } from '../../../types/StateType';
import { UpdateUser, UserItem, UserProfile } from '../../../types/UserType';
import { editUserService, getUserProfileService } from '../../../services/UserService';

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
    alert: false,
};

export const getUserProfileThunk = createAsyncThunk('getUserProfileThunk', async () => {
    const response = await getUserProfileService();
    return response;
});

export const updateUserThunk = createAsyncThunk('updateUserThunk', async (data: UpdateUser) => {
    const response = await editUserService(data);
    return response;
});

export const getUserProfileSlice = createSlice({
    name: 'get-user-profile',
    initialState,
    reducers: {
        showAlert: (state) => {
            state.alert = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfileThunk.pending, (state) => {
                state.isLoading = true;
                state.result = false;
                state.alert = false;
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action: PayloadAction<ApiResponse<UserProfile>>) => {
                state.isLoading = false;
                state.result = action.payload?.result;
                state.message = action.payload?.message;
                state.code = action.payload?.code;
                state.data = action.payload?.data;
                state.alert = false;
            })
            .addCase(getUserProfileThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.result = false;
                state.code = 400;
                state.alert = false;
            })

            .addCase(updateUserThunk.pending, (state) => {
                state.isLoading = true;
                state.result = false;
                state.alert = false;
            })
            .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<ApiResponse<UserItem>>) => {
                state.isLoading = false;
                state.result = action.payload?.result;
                state.message = action.payload?.message;
                state.code = action.payload?.code;
                state.alert = true;
                if (state.result) {
                    state.data.information = action.payload.data;
                }
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.result = false;
                state.code = 400;
                state.alert = false;
            });
    },
});

export const { showAlert } = getUserProfileSlice.actions;
const userProfileReducer = getUserProfileSlice.reducer;
export default userProfileReducer;
