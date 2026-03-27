import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { stableUserIdFromEmail } from '../../utils/stableUserId';

/** Session fields persisted to `src/data/dummy/currentState.json` (password is never stored). */
export interface UserSession {
  /** Stable owner key for future per-user data; derived from normalized email for now. */
  id: string;
  email: string;
  signedInAt: string;
}

export interface UserState {
  session: UserSession | null;
}

const initialState: UserState = {
  session: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Accepts any email/password for now. Password is ignored and not persisted.
     * Empty email still produces a session so “any” credential works.
     */
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const email = action.payload.email.trim();
      const id = stableUserIdFromEmail(email);
      state.session = {
        id,
        email,
        signedInAt: new Date().toISOString(),
      };
    },
    logout: (state) => {
      state.session = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
