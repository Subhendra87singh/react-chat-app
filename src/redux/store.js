import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/useSlice.js';
export const store = configureStore({
    reducer: {
        account: userSlice,
    },
})