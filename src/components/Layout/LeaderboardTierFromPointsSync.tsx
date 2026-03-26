import { useEffect, useRef } from 'react';
import type { LeaderboardPanelTierLevel } from '../../constants/leaderboard.constants';
import { getNaturalLeaderboardTierForTotalPoints } from '../../constants/leaderboard.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTotalPoints } from '../../store/selectors/chatSelectors';
import { setLeaderboardPanelTierLevel } from '../../store/slices/uiSlice';

/**
 * Keeps `leaderboardPanelTierLevel` aligned with total points: default tier on load, and when
 * the user crosses a tier boundary. Manual dropdown changes are preserved until then.
 */
const LeaderboardTierFromPointsSync = () => {
  const dispatch = useAppDispatch();
  const totalPoints = useAppSelector(selectTotalPoints);
  const panelTier = useAppSelector((state) => state.ui.leaderboardPanelTierLevel);
  const naturalTier = getNaturalLeaderboardTierForTotalPoints(totalPoints);
  const prevNaturalRef = useRef<LeaderboardPanelTierLevel | null>(null);

  useEffect(() => {
    if (prevNaturalRef.current === null) {
      prevNaturalRef.current = naturalTier;
      if (panelTier !== naturalTier) {
        dispatch(setLeaderboardPanelTierLevel(naturalTier));
      }
      return;
    }
    if (prevNaturalRef.current !== naturalTier) {
      prevNaturalRef.current = naturalTier;
      dispatch(setLeaderboardPanelTierLevel(naturalTier));
    }
  }, [totalPoints, naturalTier, panelTier, dispatch]);

  return null;
};

export default LeaderboardTierFromPointsSync;
