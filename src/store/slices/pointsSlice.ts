import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PointsState {
  /** Points progress shown in sidebar (0–100). Updates as user earns points. */
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
