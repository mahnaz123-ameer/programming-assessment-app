import { configureStore } from '@reduxjs/toolkit';
import assessmentReducer from '../features/assessmentSlice';

export const store = configureStore({
  reducer: {
    assessment: assessmentReducer,
  },
});