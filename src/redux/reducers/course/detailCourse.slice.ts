import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DetailCourse } from '../../../types/CourseType';
import { getViewCourseService } from '../../../services/CourseService';
import { ApiResponse } from '../../../types/ApiType';
interface detailCourseState {
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    data: DetailCourse | null;
}

const initialState: detailCourseState = {
    isLoading: false,
    isSuccess: true,
    message: '',
    data: null,
};

export const getCourseBySlug = createAsyncThunk('product/getCourseBySlug', async (slug: string | undefined) => {
    const response = await getViewCourseService(slug);
    return response;
});

export const detailCourseSlice = createSlice({
    name: 'get-course-by-slug',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseBySlug.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = true;
            })
            .addCase(getCourseBySlug.fulfilled, (state, action: PayloadAction<ApiResponse<DetailCourse>>) => {
                state.isLoading = false;
                state.isSuccess = action.payload?.result;
                state.message = action.payload?.message;
                state.data = action.payload?.data;
            })
            .addCase(getCourseBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

const detailCourseReducer = detailCourseSlice.reducer;
export default detailCourseReducer;
