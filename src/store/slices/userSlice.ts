import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getGameProgress } from '../../utils/gamePoints';

interface UserState {
  totalPoints: number;
  starsCount: number;
  ringPercentage: number;
  nextStarTarget: number;
}

const initialState: UserState = {
  totalPoints: 0,
  starsCount: 0,
  ringPercentage: 0,
  nextStarTarget: 100,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTotalPoints: (state, action: PayloadAction<number>) => {
      const totalPoints = Math.max(0, action.payload);
      const progress = getGameProgress(totalPoints);

      state.totalPoints = totalPoints;
      state.starsCount = progress.starsCount;
      state.ringPercentage = progress.ringPercentage;
      state.nextStarTarget = progress.nextStarTarget;
    },
  },
});

export const { setTotalPoints } = userSlice.actions;
export default userSlice.reducer;
