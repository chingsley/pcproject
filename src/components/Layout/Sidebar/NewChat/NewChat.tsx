import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { ICONS } from '../../../../constants/icons.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewChatButton = styled.button`
  width: 100%;
  height: ${LAYOUT.NEW_CHAT_BUTTON_HEIGHT};
  flex: none;
  flex-grow: 0;
  background: none;
  border: none;
  cursor: pointer;
  background: ${COLORS.NEW_CHAT_BUTTON_BG};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${LAYOUT.NEW_CHAT_BUTTON_RADIUS};
  cursor: pointer;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  text-align: left;
  padding-left: ${SPACING.BUTTON_PADDING_X};
  padding-right: ${SPACING.BUTTON_PADDING_X};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.BUTTON_PADDING_X};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonLeft = styled.span`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_X};
  min-width: 0;
`;

const ButtonIcon = styled.img`
  width: ${FONTS.SIZE.XLARGE};
  height: ${FONTS.SIZE.XLARGE};
  object-fit: contain;
  flex-shrink: 0;
`;

const ShortcutKeys = styled.span`
  display: flex;
  align-items: center;
  gap: ${SPACING.SHORTCUT_KEY_GAP};
  flex-shrink: 0;
`;

const ShortcutKey = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${SPACING.SHORTCUT_KEY_SIZE};
  height: ${SPACING.SHORTCUT_KEY_SIZE};
  padding: ${SPACING.SHORTCUT_KEY_PADDING_Y} ${SPACING.SHORTCUT_KEY_PADDING_X};
  background: ${COLORS.SHORTCUT_KEY_BG};
  border-radius: ${SPACING.SHORTCUT_KEY_RADIUS};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  color: ${COLORS.TEXT_PRIMARY};
  line-height: 1;
`;

interface NewChatProps {
  onClick: () => void;
}

const NewChat = ({ onClick }: NewChatProps) => (
  <Wrapper>
    <NewChatButton type="button" onClick={onClick}>
      <ButtonLeft>
        <ButtonIcon src={ICONS.NEW_CHAT_ICON} alt="" />
        New Chat
      </ButtonLeft>
      <ShortcutKeys aria-label="Shortcut: Command K">
        <ShortcutKey>⌘</ShortcutKey>
        <ShortcutKey>K</ShortcutKey>
      </ShortcutKeys>
    </NewChatButton>
  </Wrapper>
);

export default NewChat;
