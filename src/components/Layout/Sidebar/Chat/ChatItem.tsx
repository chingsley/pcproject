import styled from "styled-components";
import { COLORS } from "../../../../constants/colors.constants";
import { FONTS } from "../../../../constants/fonts.constants";
import { SPACING } from "../../../../constants/spacing.constants";
import { drawBorder } from "../../../../utils/playground";
import { LAYOUT } from "../../../../constants/layout.constants";

const ChatItemWrapper = styled.button<{ $active?: boolean; }>`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  padding: 1.5rem ${LAYOUT.SIDEBAR_ITEM_X_PADDING};
  border: none;
  background: ${(props) => (props.$active ? COLORS.PRIMARY_BLUE_LIGHT : 'transparent')};
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  border-radius: 10px; // ${SPACING.RADIUS_SMALLER};
  border: ${drawBorder('orange')};

  &:hover {
    background: ${(props) =>
    props.$active ? COLORS.PRIMARY_BLUE_LIGHT : COLORS.PRIMARY_BLUE_LIGHT};
  }
`;

const ChatItemTitle = styled.p`
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.THIN};
  color: ${COLORS.TEXT_PRIMARY};
  max-width: 30ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

const ChatItemPoints = styled.span<{ $bg: string; $textColor: string; }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  font-size: ${FONTS.SIZE.SMALL};
  color: ${(props) => props.$textColor};
  background-color: ${(props) => props.$bg};
  // padding: ${SPACING.SHORTCUT_KEY_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  padding: 0.25rem 0.5rem;
  min-width:2.25rem;
  min-height: 1.25rem;
  // border-radius: 0.8rem;
  border-radius: ${SPACING.RADIUS_SMALLER};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

export interface ChatItemProps {
  title: string;
  points: number;
  active?: boolean;
  onClick?: () => void;
}

function getPointsBadgeStyle(points: number): { bg: string; textColor: string; } {
  // return { bg: COLORS.PRIMARY_BLUE, textColor: COLORS.TEXT_PRIMARY_MUTED };

  if (points > 10) {
    return { bg: COLORS.GLASS_GREEN, textColor: COLORS.HISTORY_ITEM_POINTS_TEXT };
  }
  if (points > 5) {
    return { bg: COLORS.GLASS_AMBER, textColor: COLORS.HISTORY_ITEM_POINTS_AMBER_TEXT };
  }
  if (points > 0) {
    return { bg: COLORS.POINTS_NEUTRAL_BG, textColor: COLORS.POINTS_NEUTRAL_TEXT };
  }
  return { bg: COLORS.GLASS_RED, textColor: COLORS.HISTORY_ITEM_POINTS_RED_TEXT };
}

const ChatItem = ({ title, points, active, onClick }: ChatItemProps) => {
  const { bg, textColor } = getPointsBadgeStyle(points);
  return (
    <ChatItemWrapper type="button" $active={active} onClick={onClick}>
      <ChatItemTitle>{title}</ChatItemTitle>
      <ChatItemPoints $bg={bg} $textColor={textColor}>
        {points}
      </ChatItemPoints>
    </ChatItemWrapper>
  );
};

export default ChatItem;
