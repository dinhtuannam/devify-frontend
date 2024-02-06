import { configureStore } from '@reduxjs/toolkit';
import detailCourseReducer from './reducers/course/detailCourse.slice';
import learningCourseReducer from './reducers/learning/learningCourse.slice';
export const store = configureStore({
    reducer: {
        detailCourseStore: detailCourseReducer,
        learningCourseStore: learningCourseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
