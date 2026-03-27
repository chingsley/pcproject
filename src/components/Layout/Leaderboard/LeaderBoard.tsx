import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import {
  getLeaderboardPanelTier,
  getNaturalLeaderboardTierForTotalPoints,
} from '../../../constants/leaderboard.constants';
import { useAppSelector } from '../../../store/hooks';
import { selectLeaderboardWithUser, selectTotalPoints } from '../../../store/selectors/chatSelectors';
import type { LeaderboardEntry } from '../../../constants/leaderboard.constants';
import { drawBorder } from '../../../utils/playground';

const LeadearBox = styled.div`
  border: ${drawBorder('blue', true)};
  border-bottom: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  max-width: 24rem;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${LAYOUT.LAYOUT_CONTENT_PADDING};
`;

const RankBadge = styled.span<{ $rank: 1 | 2 | 3; }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  padding: 0 ${SPACING.BUTTON_PADDING_X};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.BOLD};
  color: ${COLORS.MAIN_BG};
  background: ${(p) =>
    p.$rank === 1
      ? COLORS.LEADERBOARD_GOLD
      : p.$rank === 2
        ? COLORS.LEADERBOARD_SILVER
        : COLORS.LEADERBOARD_BRONZE};
  box-shadow: 0 0.125rem 0.25rem ${COLORS.MODAL_SHADOW_SOFT};
`;

const EntryRow = styled.div<{ $isCurrentUser?: boolean; }>`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_X};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  // background: ${(p) => (p.$isCurrentUser ? COLORS.PRIMARY_BLUE_LIGHT : 'transparent')};
  border: ${(p) =>
    p.$isCurrentUser ? `${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE_HOVER}` : 'none'};
  margin-bottom: 0.25rem;
  transition: background 0.15s;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover:not([data-current]) {
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  }

  &[data-current] {
    box-shadow: 0 0 0 1px ${COLORS.LOADER_FILL};
  }
`;

const RankCell = styled.span<{ $isTopThree?: boolean; }>`
  flex-shrink: 0;
  width: 2rem;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${(p) => (p.$isTopThree ? FONTS.SIZE.LARGE : FONTS.SIZE.MEDIUM)};
  font-weight: ${(p) => (p.$isTopThree ? FONTS.WEIGHT.BOLD : FONTS.WEIGHT.NORMAL)};
  color: ${(p) => (p.$isTopThree ? COLORS.STAR_ACCENT : COLORS.MUTED_WHITE)};
  text-align: center;
`;

const NameCell = styled.span`
  flex: 1;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PointsCell = styled.span`
  flex-shrink: 0;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  // color: ${COLORS.LOADER_FILL};
`;

const YourRankBanner = styled.div`
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  background: linear-gradient(
    90deg,
    ${COLORS.PRIMARY_BLUE_LIGHT} 0%,
    ${COLORS.PRIMARY_BLUE} 100%
  );
  border-radius: ${SPACING.RADIUS_SMALLER};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  text-align: center;
`;

function EntryItem({
  entry,
  rank,
}: {
  entry: LeaderboardEntry;
  rank: number;
}) {
  const isTopThree = rank <= 3;

  return (
    <EntryRow
      $isCurrentUser={entry.isCurrentUser}
      data-current={entry.isCurrentUser ? '' : undefined}
    >
      <RankCell $isTopThree={isTopThree}>
        {isTopThree ? (
          <RankBadge $rank={rank as 1 | 2 | 3}>{rank}</RankBadge>
        ) : (
          rank
        )}
      </RankCell>
      <NameCell>
        {entry.displayName}
        {entry.isCurrentUser && ' (You)'}
      </NameCell>
      <PointsCell>{entry.points} pts</PointsCell>
    </EntryRow>
  );
}

/**
 * Leaderboard list in normal document flow (e.g. under placeholder text in `RightAgentPanel`).
 * Do not portal: `createPortal(..., document.body)` would detach DOM from the panel and paint
 * at the end of `<body>`, which looks “below” the main layout.
 */
const LeaderboardInline = () => {
  const leaderboard = useAppSelector(selectLeaderboardWithUser);
  const totalPoints = useAppSelector(selectTotalPoints);
  const selectedTier = useAppSelector((state) => state.ui.leaderboardPanelTierLevel);
  const naturalTier = getNaturalLeaderboardTierForTotalPoints(totalPoints);
  const tierMeta = getLeaderboardPanelTier(selectedTier);
  const viewingOwnTier = naturalTier === selectedTier;

  const bannerText =
    viewingOwnTier && selectedTier === 0
      ? "You're on the Beginners board — earn 100 points for your first star."
      : viewingOwnTier
        ? `Congrats ${tierMeta.memberName}! You're doing great!`
        : `${tierMeta.groupName} Leaderboard`;

  return (
    <LeadearBox>
      <ScrollArea>
        <YourRankBanner>{bannerText}</YourRankBanner>
        {leaderboard.map((entry, idx) => (
          <EntryItem key={entry.id} entry={entry} rank={idx + 1} />
        ))}
      </ScrollArea>
    </LeadearBox>
  );
};

export default LeaderboardInline;
