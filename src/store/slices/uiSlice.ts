import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  selectedHistoryId: string | null;
}

const initialState: UiState = {
  sidebarOpen: true,
  selectedHistoryId: null,
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
  },
});

export const { toggleSidebar, setSidebarOpen, setSelectedHistoryId } = uiSlice.actions;
export default uiSlice.reducer;
