/**
 * Leaderboard types and app constants. Mock rows live in `src/data/leaderboard.mock.ts`.
 * In a multi-user system, rows would come from an API; the current user is merged in at runtime.
 */
export interface LeaderboardEntry {
  id: string;
  displayName: string;
  points: number;
  isCurrentUser?: boolean;
}

export const CURRENT_USER_ID = 'current-user';

/** Tiers for the right-panel leaderboard level dropdown (1–5). */
export const LEADERBOARD_PANEL_TIERS = [
  { level: 1 as const, groupName: 'Explorers', memberName: 'Explorer' },
  { level: 2 as const, groupName: 'Thinkers', memberName: 'Thinker' },
  { level: 3 as const, groupName: 'Creators', memberName: 'Creator' },
  { level: 4 as const, groupName: 'Leaders', memberName: 'Leader' },
  { level: 5 as const, groupName: 'Gatekeepers', memberName: 'Gatekeeper' },
] as const;

export type LeaderboardPanelTierLevel = (typeof LEADERBOARD_PANEL_TIERS)[number]['level'];

/**
 * Natural tier from lifetime total points (matches mock band tops in `leaderboard.mock.ts`).
 * Tier 1: ≤100 (Explorers), tier 2: 101–200 (Thinkers), … tier 5: &gt;400 (Gatekeepers).
 */
export function getNaturalLeaderboardTierForTotalPoints(totalPoints: number): LeaderboardPanelTierLevel {
  if (totalPoints <= 100) return 1;
  if (totalPoints <= 200) return 2;
  if (totalPoints <= 300) return 3;
  if (totalPoints <= 400) return 4;
  return 5;
}

export function getLeaderboardPanelTier(level: LeaderboardPanelTierLevel) {
  return LEADERBOARD_PANEL_TIERS.find((t) => t.level === level) ?? LEADERBOARD_PANEL_TIERS[0];
}
