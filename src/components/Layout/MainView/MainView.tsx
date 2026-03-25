import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearLastAddedAssistantMessageId } from '../../../store/slices/chatSlice';
import { toggleSidebar, setRightPanelOpen } from '../../../store/slices/uiSlice';
import InputBox from './InputBox/InputBox';
import MessageList from './MessageList/MessageList';
import RightAgentPanel from './RightAgentPanel/RightAgentPanel';
import { drawBorder } from '../../../utils/playground';
import { FiAward, FiShare } from 'react-icons/fi';


const MainContainer = styled.div<{ $sidebarOpen: boolean; $rightPanelOpen: boolean; }>`
  margin-left: ${(props) => (props.$sidebarOpen ? LAYOUT.SIDEBAR_WIDTH : '0')};
  margin-right: ${(props) =>
    props.$rightPanelOpen ? `min(${LAYOUT.RIGHT_PANEL_WIDTH}, 100vw)` : '0'};
  height: 100vh;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${COLORS.MAIN_BG};
  transition:
    margin-left 0.3s ease-in-out,
    margin-right 0.3s ease-in-out;
  padding: ${LAYOUT.LAYOUT_CONTENT_PADDING};
  display: flex;
  flex-direction: column;
  border: ${drawBorder('red')};

  @media (max-width: ${LAYOUT.BREAKPOINTS.LARGE}) {
    margin-left: 0;
  }
`;

const HeaderContainer = styled.div`
  min-height: ${LAYOUT.HEADER_ROW_HEIGHT};
  border: ${drawBorder('blue')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  flex-shrink: 0;
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

const PlaceholderContent = styled.div`
  flex: 1;
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;

  .header {
    font-size: 2.5rem;
    border: ${drawBorder('purple')};
    margin-bottom: 1rem;
  }
  .subheader {
    color: ${COLORS.MUTED_WHITE};
    border: ${drawBorder('white')};
    margin-bottom: 2rem;
  }
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const InputBoxWrapper = styled.div`
  flex-shrink: 0;
  margin-top: auto;
`;

const InputBoxContent = styled.div`
  width: 100%;
  max-width: ${LAYOUT.INPUT_BOX_WIDTH};
  margin: 0 auto;
  border: ${drawBorder('yellow', true)};
`;

const ToggleButton = styled.button`
  position: fixed;
  top: ${LAYOUT.SIDEBAR_TOGGLE_TOP};
  left: ${SPACING.FIXED_OFFSET};
  background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  color: ${COLORS.TEXT_PRIMARY};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALL};
  cursor: pointer;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  transition: all 0.2s ease;
  z-index: 100;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_MEDIUM};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const headerActionStyles = `
  background: transparent;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

const ShareButton = styled.div`
  ${headerActionStyles}
`;

const LeaderboardButton = styled.button`
  ${headerActionStyles}
`;

const AIFactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  border: ${drawBorder('red')};
  margin-bottom: ${SPACING.MAIN_VIEW_BOTTOM_MARGIN};
`;

const AIFactMessage = styled.p`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: ${drawBorder('red')};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: 1rem;
`;
const AIFactSource = styled.a`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: ${drawBorder('red')};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.TEXT_PRIMARY};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

interface MainViewProps {
  sidebarOpen: boolean;
}

const MainView = ({ sidebarOpen }: MainViewProps) => {
  const dispatch = useAppDispatch();
  const rightPanelOpen = useAppSelector((state) => state.ui.rightPanelOpen);
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);
  const messageIds = useAppSelector((state) =>
    activeChatId ? state.chat.messageIdsByChatId[activeChatId] ?? [] : []
  );
  const chatContentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const scrollToBottom = useCallback(() => {
    const el = chatContentRef.current;
    if (el) el.scrollTop = el.scrollHeight - el.clientHeight;
  }, []);

  const handleAnimationComplete = useCallback(() => {
    dispatch(clearLastAddedAssistantMessageId());
  }, [dispatch]);

  useEffect(() => {
    if (messageIds.length > 0 && chatContentRef.current) {
      const el = chatContentRef.current;
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }, [messageIds.length, activeChatId]);

  return (
    <>
      <MainContainer $sidebarOpen={sidebarOpen} $rightPanelOpen={rightPanelOpen}>
        <HeaderContainer>
          <HeaderTitle>Active Research</HeaderTitle>
          <HeaderActions>
            <ShareButton>
              <FiShare aria-hidden />
              Share
            </ShareButton>
            <LeaderboardButton
              type="button"
              aria-label="Open leaderboard in side panel"
              onClick={() => dispatch(setRightPanelOpen(true))}
            >
              <FiAward aria-hidden />
              Leaderboard
            </LeaderboardButton>
          </HeaderActions>
        </HeaderContainer>
        <ToggleButton onClick={handleToggle}>☰</ToggleButton>
        {!activeChatId ? (
          <PlaceholderContent>
            <h1 className="header">Think clearly. Engage deeply. Stay in charge.</h1>
            <p className="subheader">
              Produce work that remains recognisably and confidently your own. Every prompt counts!
            </p>
            <InputBox />
          </PlaceholderContent>
        ) : (
          <>
            <ChatContent ref={chatContentRef}>
              <MessageList
                onScrollToBottom={scrollToBottom}
                onAnimationComplete={handleAnimationComplete}
              />
            </ChatContent>
            <InputBoxWrapper>
              <InputBoxContent>
                <InputBox />
              </InputBoxContent>
            </InputBoxWrapper>
          </>
        )}
        <AIFactContainer>
          <AIFactMessage>"Some facts about the impact of AI on the human race"</AIFactMessage>
          <AIFactSource href="https://www.google.com">
            John et al. (2026)
          </AIFactSource>
        </AIFactContainer>
      </MainContainer>
      <RightAgentPanel />
    </>
  );
};

export default MainView;
