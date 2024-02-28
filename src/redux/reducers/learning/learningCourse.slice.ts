import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../types/ApiType';
import { CourseLearningInfo } from '../../../types/LearningType';
import { getLearningCourseService } from '../../../services/LearningService';
import { AsyncState } from '../../../types/StateType';

const EmptyCourseLearningInfo: CourseLearningInfo = {
    code: '',
    title: '',
    des: '',
    image: '',
    createTime: '',
    updateTime: '',
    isOwner: false,
    totalChapter: 0,
    totalLesson: 0,
    creator: {
        code: '',
        displayName: '',
        username: '',
        image: '',
    },
    chapters: [],
};

const initialState: AsyncState<CourseLearningInfo> = {
    isLoading: false,
    code: 0,
    result: true,
    message: '',
    data: EmptyCourseLearningInfo,
    alert: false,
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
                state.result = true;
            })
            .addCase(
                getLearningCourseThunk.fulfilled,
                (state, action: PayloadAction<ApiResponse<CourseLearningInfo>>) => {
                    state.isLoading = false;
                    state.result = action.payload?.result;
                    state.message = action.payload?.message;
                    state.code = action.payload?.code;
                    state.data = action.payload?.data;
                },
            )
            .addCase(getLearningCourseThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.result = false;
                state.code = 400;
            });
    },
});

const learningCourseReducer = learningCourseSlice.reducer;
export default learningCourseReducer;
