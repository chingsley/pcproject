import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { EngagementType } from '../../utils/engagementPrompt';

interface UiState {
  sidebarOpen: boolean;
  selectedHistoryId: string | null;
  engagementContext: null | {
    active: boolean;
    chatId: string;
    assistantMessageId: string;
    assistantResponse: string;
    engagementType: EngagementType;
  };
}

const initialState: UiState = {
  sidebarOpen: true,
  selectedHistoryId: null,
  engagementContext: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSelectedHistoryId: (state, action: PayloadAction<string | null>) => {
      state.selectedHistoryId = action.payload;
    },
    setEngagementContext: (state, action: PayloadAction<UiState['engagementContext']>) => {
      state.engagementContext = action.payload;
    },
    clearEngagementContext: (state) => {
      state.engagementContext = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSelectedHistoryId,
  setEngagementContext,
  clearEngagementContext,
} = uiSlice.actions;
export default uiSlice.reducer;
