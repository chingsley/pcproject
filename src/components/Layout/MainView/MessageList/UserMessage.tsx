import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const BubbleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
`;

const MessageAndPointWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 70%;
`;

const Bubble = styled.div`
  padding: ${SPACING.BUTTON_PADDING_X};
  background: #2f325c69;
  border-radius: ${SPACING.RADIUS_SMALL};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  line-height: 1.5;
`;

const MessagePoint = styled.span<{
  $backgroundColor: string;
  $color: string;
  $isPending: boolean;
}>`
  margin-top: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background-color: ${(p) => p.$backgroundColor};
  color: ${(p) => p.$color};
  border: ${SPACING.BORDER_WIDTH} solid
    ${(p) => (p.$isPending ? COLORS.BORDER_SUBTLE : COLORS.TRANSPARENT)};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  line-height: 1;
  min-width: ${SPACING.SUBMIT_BUTTON_WIDTH};
  text-align: center;
`;

function getMessagePointColors(
  points: number
): { backgroundColor: string; color: string } {
  if (points >= 4) {
    return {
      backgroundColor: COLORS.GLASS_GREEN,
      color: COLORS.HISTORY_ITEM_POINTS_TEXT,
    };
  }
  if (points >= 2) {
    return {
      backgroundColor: COLORS.GLASS_AMBER,
      color: COLORS.HISTORY_ITEM_POINTS_AMBER_TEXT,
    };
  }
  if (points === 1) {
    return {
      backgroundColor: COLORS.POINTS_NEUTRAL_BG,
      color: COLORS.POINTS_NEUTRAL_TEXT,
    };
  }
  return {
    backgroundColor: COLORS.GLASS_RED,
    color: COLORS.HISTORY_ITEM_POINTS_RED_TEXT,
  };
}

export interface UserMessageProps {
  content: string;
  promptPoint?: number;
}

const UserMessage = ({ content, promptPoint }: UserMessageProps) => {
  const isPending = promptPoint === undefined;
  const resolvedPoints = promptPoint ?? 0;
  const { backgroundColor, color } = isPending
    ? {
        backgroundColor: COLORS.SURFACE_OVERLAY_LIGHT,
        color: COLORS.TRANSPARENT,
      }
    : getMessagePointColors(resolvedPoints);
  const pointLabel = `${resolvedPoints} ${resolvedPoints === 1 ? 'point' : 'points'}`;

  return (
    <BubbleWrapper>
      <MessageAndPointWrapper>
        <Bubble>{content}</Bubble>
        <MessagePoint
          $backgroundColor={backgroundColor}
          $color={color}
          $isPending={isPending}
          aria-label={isPending ? 'Awaiting prompt points' : pointLabel}
        >
          {pointLabel}
        </MessagePoint>
      </MessageAndPointWrapper>
    </BubbleWrapper>
  );
};

export default UserMessage;
