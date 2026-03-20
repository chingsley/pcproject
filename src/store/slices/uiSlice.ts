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
  /** Assistant message IDs that passed the quiz (100% score); copy/share enabled for these */
  quizPassedAssistantMessageIds: string[];
}

const initialState: UiState = {
  sidebarOpen: true,
  selectedHistoryId: null,
  engagementContext: null,
  quizPassedAssistantMessageIds: [],
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
    markQuizPassed: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const ids = state.quizPassedAssistantMessageIds ?? [];
      if (!ids.includes(id)) {
        state.quizPassedAssistantMessageIds = [...ids, id];
      }
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSelectedHistoryId,
  setEngagementContext,
  clearEngagementContext,
  markQuizPassed,
} = uiSlice.actions;
export default uiSlice.reducer;
