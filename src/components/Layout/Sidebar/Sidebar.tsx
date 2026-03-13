import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { ICONS } from '../../../constants/icons.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { SPACING } from '../../../constants/spacing.constants';
import SidebarToggle from './SidebarToggle';
import Points from './PointsRing/Points';

const SidebarContainer = styled.div<{ $isOpen: boolean; }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${LAYOUT.SIDEBAR_WIDTH};
  max-width: 90vw;
  background-color: ${COLORS.SIDEBAR_BG};
  transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: ${LAYOUT.BREAKPOINTS.LARGE}) {
    width: 100%;
    max-width: 100%;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: ${LAYOUT.PANEL_PADDING};
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const MiddleSection = styled.div`
  flex: 1;
  min-height: 0;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div`
  height: ${LAYOUT.SIDEBAR_HEADER_HEIGHT};
  // border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarNewChat = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
`;

const NewChatButton = styled.button`
  width: 100%;
  height: ${LAYOUT.NEW_CHAT_BUTTON_HEIGHT};
  flex: none;
  flex-grow: 0;
  background: ${COLORS.NEW_CHAT_BUTTON_BG};
  border: none;
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
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const NewChatButtonLeft = styled.span`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_X};
  min-width: 0;
`;

const NewChatButtonIcon = styled.img`
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

const HeaderRow = styled.div`
  height: ${LAYOUT.SIDEBAR_HEADER_ROW_HEIGHT};
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${SPACING.BUTTON_PADDING_X};
  // border: 1px solid red;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.175rem;;
  min-width: 0;
`;

const LightbulbIcon = styled.img`
  height: ${LAYOUT.LIGHTBULB_ICON_HEIGHT};
  width: auto;
  object-fit: contain;
  object-position: bottom;
  flex-shrink: 0;
  display: block;
  vertical-align: bottom;
`;

const HeaderTitle = styled.span`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.XLARGEPLUS};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.TEXT_PRIMARY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
  display: inline-block;
`;
const SidebarPoints = styled.div`
  height: ${LAYOUT.SIDEBAR_POINTS_HEIGHT};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;
const SidebarHistory = styled.div`
  min-height: ${LAYOUT.SIDEBAR_HISTORY_MIN_HEIGHT};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;
const SidebarFooter = styled.div`
  height: ${LAYOUT.SIDEBAR_FOOTER_HEIGHT};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarContent>
        <TopSection>
          <SidebarHeader>
            <HeaderRow>
              <HeaderLeft>
                <LightbulbIcon src={ICONS.LIGHTBULB_ICON} alt="" />
                <HeaderTitle>AR | Mode</HeaderTitle>
              </HeaderLeft>
              <SidebarToggle />
            </HeaderRow>
          </SidebarHeader>
          <SidebarNewChat>
            <NewChatButton type="button">
              <NewChatButtonLeft>
                <NewChatButtonIcon src={ICONS.NEW_CHAT_ICON} alt="" />
                New Chat
              </NewChatButtonLeft>
              <ShortcutKeys aria-label="Shortcut: Command K">
                <ShortcutKey>⌘</ShortcutKey>
                <ShortcutKey>K</ShortcutKey>
              </ShortcutKeys>
            </NewChatButton>
          </SidebarNewChat>
          <SidebarPoints>
            <Points />
          </SidebarPoints>
        </TopSection>

        <MiddleSection />

        <BottomSection>
          <SidebarHistory />
          <SidebarFooter />
        </BottomSection>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

