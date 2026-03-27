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

/**
 * Tiers for the right-panel leaderboard level dropdown (0–5).
 * Level 0 = before the first star (&lt;100 pts). Levels 1–5 align with stars (100 pts per star).
 */
export const LEADERBOARD_PANEL_TIERS = [
  { level: 0 as const, groupName: 'Beginners', memberName: 'Beginner' },
  { level: 1 as const, groupName: 'Explorers', memberName: 'Explorer' },
  { level: 2 as const, groupName: 'Thinkers', memberName: 'Thinker' },
  { level: 3 as const, groupName: 'Creators', memberName: 'Creator' },
  { level: 4 as const, groupName: 'Leaders', memberName: 'Leader' },
  { level: 5 as const, groupName: 'Gatekeepers', memberName: 'Gatekeeper' },
] as const;

export type LeaderboardPanelTierLevel = (typeof LEADERBOARD_PANEL_TIERS)[number]['level'];

/**
 * Natural tier from lifetime total points (matches mock bands in `leaderboard.mock.ts`).
 * Tier 0: &lt;100 (0 stars, Beginners). Tier 1: 100–199 (1★ Explorer), … tier 5: ≥500 (5★ Gatekeeper).
 */
export function getNaturalLeaderboardTierForTotalPoints(totalPoints: number): LeaderboardPanelTierLevel {
  if (totalPoints < 100) return 0;
  if (totalPoints < 200) return 1;
  if (totalPoints < 300) return 2;
  if (totalPoints < 400) return 3;
  if (totalPoints < 500) return 4;
  return 5;
}

export function getLeaderboardPanelTier(level: LeaderboardPanelTierLevel) {
  return LEADERBOARD_PANEL_TIERS.find((t) => t.level === level) ?? LEADERBOARD_PANEL_TIERS[0];
}
