import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

/** Game points progress (0–100). Used for the sidebar ring; game logic to be implemented later. */
interface PointsState {
  percentage: number;
}

const initialState: PointsState = {
  percentage: 20,
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setPointsPercentage: (state, action: PayloadAction<number>) => {
      state.percentage = Math.min(100, Math.max(0, action.payload));
    },
  },
});

export const { setPointsPercentage } = pointsSlice.actions;
export default pointsSlice.reducer;
