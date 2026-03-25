/**
 * Mock leaderboard entries for display. In a multi-user system, this would
 * come from an API. The current user is merged in at runtime with isCurrentUser: true.
 */
export interface LeaderboardEntry {
  id: string;
  displayName: string;
  points: number;
  isCurrentUser?: boolean;
}

/** Placeholder entries to show context. Current user merged in by selectLeaderboardWithUser. */
export const MOCK_LEADERBOARD_ENTRIES: Omit<LeaderboardEntry, 'isCurrentUser'>[] = [
  { id: 'lb-1', displayName: 'Alex Rivera', points: 420 },
  { id: 'lb-2', displayName: 'Jordan Chen', points: 385 },
  { id: 'lb-3', displayName: 'Sam Foster', points: 312 },
  { id: 'lb-4', displayName: 'Taylor Brooks', points: 278 },
  { id: 'lb-5', displayName: 'Morgan Lee', points: 245 },
  { id: 'lb-6', displayName: 'Riley Quinn', points: 198 },
  { id: 'lb-7', displayName: 'Casey Blake', points: 167 },
  { id: 'lb-8', displayName: 'Avery Jordan', points: 124 },
  { id: 'lb-9', displayName: 'Quinn Morgan', points: 89 },
  { id: 'lb-10', displayName: 'Dakota Reese', points: 52 },
];

export const CURRENT_USER_ID = 'current-user';
