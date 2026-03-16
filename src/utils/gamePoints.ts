/**
 * TODO: Multi-user support later.
 * Current logic assumes one active user profile.
 */

// TODO: Make this configurable later (Market config / game rules / etc.)
export const POINTS_PER_STAR = 100;

export interface GameProgress {
  starsCount: number;
  ringPercentage: number;
  nextStarTarget: number;
}

export function getGameProgress(
  totalPoints: number,
  pointsPerStar = POINTS_PER_STAR
): GameProgress {
  const safePoints = Math.max(0, totalPoints);
  const safePointsPerStar = Math.max(1, pointsPerStar);

  const starsCount = Math.floor(safePoints / safePointsPerStar);
  const pointsIntoCurrentStar = safePoints % safePointsPerStar;
  const ringPercentage = (pointsIntoCurrentStar / safePointsPerStar) * 100;
  const nextStarTarget = (starsCount + 1) * safePointsPerStar;

  return {
    starsCount,
    ringPercentage,
    nextStarTarget,
  };
}
