import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import pointsReducer from './slices/pointsSlice';
import historyReducer from './slices/historySlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    points: pointsReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
