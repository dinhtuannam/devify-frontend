import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../types/ApiType';
import { LearningCourseType } from '../../../types/LearningType';
import { getLearningCourseService } from '../../../services/LearningService';
import { AsyncState } from '../../../types/StateType';

const initialState: AsyncState<LearningCourseType> = {
    isLoading: false,
    isSuccess: true,
    message: '',
    data: null,
};

export const getLearningCourseThunk = createAsyncThunk('get-learing-course', async (slug: string | undefined) => {
    const response = await getLearningCourseService(slug);
    return response;
});

export const learningCourseSlice = createSlice({
    name: 'get-learing-course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLearningCourseThunk.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = true;
            })
            .addCase(
                getLearningCourseThunk.fulfilled,
                (state, action: PayloadAction<ApiResponse<LearningCourseType>>) => {
                    state.isLoading = false;
                    state.isSuccess = action.payload?.success;
                    state.message = action.payload?.message;
                    state.data = action.payload?.data;
                },
            )
            .addCase(getLearningCourseThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

const learningCourseReducer = learningCourseSlice.reducer;
export default learningCourseReducer;
