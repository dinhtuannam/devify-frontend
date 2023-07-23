import { configureStore } from '@reduxjs/toolkit';
import detailCourseReducer from './reducers/course/detailCourse.slice';

export const store = configureStore({
    reducer: {
        detailCourseStore: detailCourseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
