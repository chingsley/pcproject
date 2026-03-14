import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

/** Single chat history entry; points are accumulated within that chat. */
export interface HistoryItemEntry {
  id: string;
  title: string;
  points: number;
}

interface HistoryState {
  /** Chat history list; each item's points reflect what the user earned in that chat. */
  items: HistoryItemEntry[];
}

const initialState: HistoryState = {
  items: [
    { id: '1', title: 'Lorem ipsum', points: 100 },
    { id: '2', title: 'Dolor sit amet, consectetur adipiscing elit', points: 61 },
    { id: '3', title: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', points: 25 },
    { id: '4', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '5', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '6', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '7', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '8', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '9', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '10', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '11', title: 'Labore et dolore magna aliqua', points: 0 },
    { id: '12', title: 'Labore et dolore magna aliqua', points: 0 },
  ],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryItemPoints: (state, action: PayloadAction<{ id: string; points: number; }>) => {
      const entry = state.items.find((item) => item.id === action.payload.id);
      if (entry) entry.points = Math.max(0, action.payload.points);
    },
    addHistoryItemPoints: (state, action: PayloadAction<{ id: string; delta: number; }>) => {
      const entry = state.items.find((item) => item.id === action.payload.id);
      if (entry) entry.points = Math.max(0, entry.points + action.payload.delta);
    },
  },
});

export const { setHistoryItemPoints, addHistoryItemPoints } = historySlice.actions;
export default historySlice.reducer;
