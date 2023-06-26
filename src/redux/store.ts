import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
export const store = configureStore({
    reducer: {
        authStore: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
