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
}>`
  margin-top: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background-color: ${(p) => p.$backgroundColor};
  color: ${(p) => p.$color};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  line-height: 1;
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

const UserMessage = ({ content, promptPoint = 0 }: UserMessageProps) => {
  const { backgroundColor, color } = getMessagePointColors(promptPoint);

  return (
    <BubbleWrapper>
      <MessageAndPointWrapper>
        <Bubble>{content}</Bubble>
        <MessagePoint $backgroundColor={backgroundColor} $color={color}>
          {promptPoint} {promptPoint === 1 ? 'point' : 'points'}
        </MessagePoint>
      </MessageAndPointWrapper>
    </BubbleWrapper>
  );
};

export default UserMessage;
