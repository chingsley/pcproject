import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import pointsReducer from './slices/pointsSlice';
import chatReducer from './slices/chatSlice';

export function createStore(preloadedState?: object) {
  return configureStore({
    reducer: {
      ui: uiReducer,
      points: pointsReducer,
      chat: chatReducer,
    },
    preloadedState,
  });
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
