import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DetailCourse } from '../../../types/CourseType';
import { getViewCourseService } from '../../../services/CourseService';
import { ApiResponse } from '../../../types/ApiType';

interface updateCourseState {
    loading: boolean;
    result: boolean;
    message: string;
    data: DetailCourse;
}

const EmptyDetailCourse: DetailCourse = {
    code: '',
    title: '',
    purchases: 0,
    price: 0,
    salePrice: 0,
    des: '',
    image: '',
    isactivated: false,
    issale: false,
    owner: false,
    createTime: '',
    updateTime: '',
    creator: {
        code: '',
        displayName: '',
        username: '',
        image: '',
    },
    category: {
        code: '',
        name: '',
        des: '',
    },
    languages: [],
    level: [],
    chapters: [],
};

const initialState: updateCourseState = {
    loading: false,
    result: false,
    message: '',
    data: EmptyDetailCourse,
};

export const getCourseDataThunk = createAsyncThunk('getCourseDataThunk', async (code: string | undefined) => {
    const response = await getViewCourseService(code);
    return response;
});

export const updateCourseSlice = createSlice({
    name: 'updateCourseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseDataThunk.pending, (state) => {
                state.loading = true;
                state.result = false;
            })
            .addCase(getCourseDataThunk.fulfilled, (state, action: PayloadAction<ApiResponse<DetailCourse>>) => {
                state.loading = false;
                state.result = action.payload?.result;
                state.message = action.payload?.message;
                state.data = action.payload?.data;
            })
            .addCase(getCourseDataThunk.rejected, (state, action) => {
                state.loading = false;
                state.result = false;
            });
    },
});

const updateCourseReducer = updateCourseSlice.reducer;
export default updateCourseReducer;
