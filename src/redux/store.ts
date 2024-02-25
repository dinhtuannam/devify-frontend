import { configureStore } from '@reduxjs/toolkit';
import detailCourseReducer from './reducers/course/detailCourse.slice';
import learningCourseReducer from './reducers/learning/learningCourse.slice';
import userCartReducer from './reducers/cart/userCart.slice';
import userProfileReducer from './reducers/user/getProfile.slice';

export const store = configureStore({
    reducer: {
        detailCourseStore: detailCourseReducer,
        learningCourseStore: learningCourseReducer,
        userCartStore: userCartReducer,
        userProfileStore: userProfileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
