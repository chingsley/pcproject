import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { LeaderboardPanelTierLevel } from '../../constants/leaderboard.constants';
import type { EngagementType } from '../../utils/engagementPrompt';
import type { PassiveZeroPromptQuotaState } from '../../utils/operantDelayState';
import { applyPassiveZeroQuotaAfterZeroPointMessage } from '../../utils/operantDelayState';

interface UiState {
  sidebarOpen: boolean;
  selectedHistoryId: string | null;
  /** Summarize / Paraphrase / Analyze — drives input caption and sendEngagement */
  engagementContext: null | {
    active: boolean;
    chatId: string;
    assistantMessageId: string;
    assistantResponse: string;
    engagementType: EngagementType;
  };
  /**
   * Copy/share unlock quiz (MCQ) only — inline under the assistant message.
   * Mutually exclusive with `engagementContext` when either is active.
   */
  copyShareQuizContext: null | {
    active: boolean;
    chatId: string;
    assistantMessageId: string;
  };
  /** Assistant message IDs that passed the quiz (100% score); copy/share enabled for these */
  quizPassedAssistantMessageIds: string[];
  /**
   * App-wide quota for 0-point main replies: rolling window + free count before delay.
   * Updated only from main `sendMessage` assistant responses (not engagement / quiz). Not per chat.
   */
  passiveZeroPromptQuota: PassiveZeroPromptQuotaState;
  /** Right full-height collapsible panel (e.g. agent prompts, leaderboard) */
  rightPanelOpen: boolean;
  /** Leaderboard tier tab in the right panel (drives mock list + copy). */
  leaderboardPanelTierLevel: LeaderboardPanelTierLevel;
}

const initialState: UiState = {
  sidebarOpen: true,
  selectedHistoryId: null,
  engagementContext: null,
  copyShareQuizContext: null,
  quizPassedAssistantMessageIds: [],
  passiveZeroPromptQuota: {
    windowStartMs: null,
    zeroPointCountInWindow: 0,
  },
  rightPanelOpen: false,
  leaderboardPanelTierLevel: 1,
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
      if (action.payload?.active) {
        state.copyShareQuizContext = null;
      }
    },
    clearEngagementContext: (state) => {
      state.engagementContext = null;
    },
    setCopyShareQuizContext: (state, action: PayloadAction<UiState['copyShareQuizContext']>) => {
      state.copyShareQuizContext = action.payload;
      if (action.payload?.active) {
        state.engagementContext = null;
      }
    },
    clearCopyShareQuizContext: (state) => {
      state.copyShareQuizContext = null;
    },
    markQuizPassed: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const ids = state.quizPassedAssistantMessageIds ?? [];
      if (!ids.includes(id)) {
        state.quizPassedAssistantMessageIds = [...ids, id];
      }
    },
    /**
     * Call when a **main** assistant reply arrives from `sendMessage` (not engagement / quiz).
     */
    recordMainAssistantOperantScore: (
      state,
      action: PayloadAction<{
        chatId: string;
        promptPoint: number;
        isEngagementResponse: boolean;
        recordedAtMs?: number;
      }>
    ) => {
      const { promptPoint, isEngagementResponse, recordedAtMs } = action.payload;
      if (isEngagementResponse) return;
      if (promptPoint !== 0) return;

      const now = recordedAtMs ?? Date.now();
      state.passiveZeroPromptQuota = applyPassiveZeroQuotaAfterZeroPointMessage(
        state.passiveZeroPromptQuota,
        now
      );
    },
    toggleRightPanel: (state) => {
      state.rightPanelOpen = !state.rightPanelOpen;
    },
    setRightPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.rightPanelOpen = action.payload;
    },
    setLeaderboardPanelTierLevel: (state, action: PayloadAction<LeaderboardPanelTierLevel>) => {
      state.leaderboardPanelTierLevel = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSelectedHistoryId,
  setEngagementContext,
  clearEngagementContext,
  setCopyShareQuizContext,
  clearCopyShareQuizContext,
  markQuizPassed,
  recordMainAssistantOperantScore,
  toggleRightPanel,
  setRightPanelOpen,
  setLeaderboardPanelTierLevel,
} = uiSlice.actions;
export default uiSlice.reducer;
