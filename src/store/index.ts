import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import pointsReducer from './slices/pointsSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    points: pointsReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
