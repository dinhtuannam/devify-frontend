import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../types/ApiType';
import { LearningLessonType } from '../../../types/LearningType';
import { getLearningLessonService } from '../../../services/LearningService';
import { AsyncState } from '../../../types/StateType';

const initialState: AsyncState<LearningLessonType> = {
    isLoading: false,
    isSuccess: true,
    message: '',
    data: null,
};

export const getLearningLessonThunk = createAsyncThunk(
    'get-learning-lesson',
    async ({ slug, lessonId }: { slug: string | null; lessonId: string | null }) => {
        const response = await getLearningLessonService(slug, lessonId);
        return response;
    },
);

export const learningLessonSlice = createSlice({
    name: 'get-learning-lesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLearningLessonThunk.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = true;
            })
            .addCase(
                getLearningLessonThunk.fulfilled,
                (state, action: PayloadAction<ApiResponse<LearningLessonType>>) => {
                    state.isLoading = false;
                    state.isSuccess = action.payload?.success;
                    state.message = action.payload?.message;
                    state.data = action.payload?.data;
                },
            )
            .addCase(getLearningLessonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

const learningLessonReducer = learningLessonSlice.reducer;
export default learningLessonReducer;
