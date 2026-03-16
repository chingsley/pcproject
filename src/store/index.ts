import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import pointsReducer from './slices/pointsSlice';
import chatReducer from './slices/chatSlice';
import userReducer from './slices/userSlice';

export function createStore(preloadedState?: object) {
  return configureStore({
    reducer: {
      ui: uiReducer,
      points: pointsReducer,
      chat: chatReducer,
      user: userReducer,
    },
    preloadedState,
  });
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
