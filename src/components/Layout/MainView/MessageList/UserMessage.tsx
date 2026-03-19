import styled from 'styled-components';
import { FiInfo } from 'react-icons/fi';
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
  // background: ${COLORS.PRIMARY_BLUE_LIGHT};
  background: ${COLORS.PRIMARY_BLUE};
  border-radius: ${SPACING.RADIUS_SMALL};
  color: ${COLORS.TEXT_PRIMARY_MUTED};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  // font-weight: ${FONTS.WEIGHT.THIN};
  line-height: 1.5;
`;

const PointsMetaRow = styled.div`
  margin-top: ${SPACING.BUTTON_PADDING_Y};
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const InfoTrigger = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const InfoIconButton = styled.button<{
  $backgroundColor: string;
  $color: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${FONTS.SIZE.LARGE};
  height: ${FONTS.SIZE.LARGE};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: 999rem;
  background: ${(p) => p.$backgroundColor};
  color: ${(p) => p.$color};
  padding: 0;
  cursor: pointer;
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    background-color 200ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-0.0625rem);
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
    outline: none;
  }
`;

const FeedbackPanel = styled.div<{
  $backgroundColor: string;
  $color: string;
  $isPending: boolean;
}>`
  position: absolute;
  right: calc(100% + ${SPACING.BUTTON_PADDING_Y});
  top: 50%;
  transform: translateY(-50%) translateX(${SPACING.BUTTON_PADDING_Y}) scaleX(0);
  transform-origin: right center;
  width: 18rem;
  max-width: 45vw;
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border: ${SPACING.BORDER_WIDTH} solid
    ${(p) => (p.$isPending ? COLORS.BORDER_SUBTLE : p.$color)};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background: ${(p) => p.$backgroundColor};
  color: ${(p) => (p.$isPending ? COLORS.TEXT_PRIMARY : p.$color)};
  font-size: ${FONTS.SIZE.SMALL};
  font-family: ${FONTS.FAMILY.PRIMARY};
  line-height: 1.4;
  direction: ltr;
  text-align: left;
  opacity: 0;
  pointer-events: none;
  white-space: normal;
  z-index: 1;
  transition:
    opacity 220ms ease,
    transform 260ms ease;

  ${InfoTrigger}:hover &,
  ${InfoTrigger}:focus-within & {
    opacity: 1;
    transform: translateY(-50%) translateX(0) scaleX(1);
  }
`;

const MessagePoint = styled.span<{
  $backgroundColor: string;
  $color: string;
  $isPending: boolean;
}>`
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
): { backgroundColor: string; color: string; } {
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
  promptFeedback?: string;
}

const UserMessage = ({ content, promptPoint, promptFeedback }: UserMessageProps) => {
  const isPending = promptPoint === undefined;
  const resolvedPoints = promptPoint ?? 0;
  const { backgroundColor, color } = isPending
    ? {
      backgroundColor: COLORS.SURFACE_OVERLAY_LIGHT,
      color: COLORS.TRANSPARENT,
    }
    : getMessagePointColors(resolvedPoints);
  const pointLabel = `${resolvedPoints} ${resolvedPoints === 1 ? 'point' : 'points'}`;
  const feedbackText = isPending
    ? 'Prompt feedback will appear once the assistant responds.'
    : promptFeedback?.trim() || 'No prompt feedback available for this message yet.';

  return (
    <BubbleWrapper>
      <MessageAndPointWrapper>
        <Bubble>{content}</Bubble>
        <PointsMetaRow>
          <InfoTrigger>
            <InfoIconButton
              type='button'
              $backgroundColor={backgroundColor}
              $color={color}
              aria-label='Show prompt feedback'
            >
              <FiInfo />
            </InfoIconButton>
            <FeedbackPanel
              role='tooltip'
              $backgroundColor={backgroundColor}
              $color={color}
              $isPending={isPending}
            >
              {feedbackText}
            </FeedbackPanel>
          </InfoTrigger>
          <MessagePoint
            $backgroundColor={backgroundColor}
            $color={color}
            $isPending={isPending}
            aria-label={isPending ? 'Awaiting prompt points' : pointLabel}
          >
            {pointLabel}
          </MessagePoint>
        </PointsMetaRow>
      </MessageAndPointWrapper>
    </BubbleWrapper>
  );
};

export default UserMessage;
