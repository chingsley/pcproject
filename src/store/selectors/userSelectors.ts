import type { RootState } from '../index';

export const selectIsAuthenticated = (state: RootState) => state.user.session !== null;

/** Use for future record ownership; `null` when logged out. */
export const selectCurrentUserId = (state: RootState) => state.user.session?.id ?? null;

export const selectCurrentUserEmail = (state: RootState) => state.user.session?.email ?? null;
