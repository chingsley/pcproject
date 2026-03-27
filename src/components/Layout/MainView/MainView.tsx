import { useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearActiveChatId,
  clearLastAddedAssistantMessageId,
} from '../../../store/slices/chatSlice';
import { toggleSidebar, setRightPanelOpen, clearEngagementContext } from '../../../store/slices/uiSlice';
import { selectIsAuthenticated } from '../../../store/selectors/userSelectors';
import InputBox from './InputBox/InputBox';
import MessageList from './MessageList/MessageList';
import RightAgentPanel from './RightAgentPanel/RightAgentPanel';
import AIFactBlock from './AIFactBlock/AIFactBlock';
import PassiveQuotaStrip from './PassiveQuotaStrip';
import MainLoginForm from './MainLoginForm';
import { drawBorder } from '../../../utils/playground';
import { FiAward, FiLogIn, FiShare } from 'react-icons/fi';

const PLACEHOLDER_ENTRANCE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const placeholderEntrance = keyframes`
  from {
    opacity: 0;
    transform: translateY(${SPACING.REVEAL_MESSAGE_LIFT});
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PlaceholderRoot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  animation: ${placeholderEntrance} ${LAYOUT.REVEAL_TRANSITION_DURATION} ${PLACEHOLDER_ENTRANCE_EASE}
    forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

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
  margin-bottom: 1rem;
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
    border: ${drawBorder('purple')};
    font-size: 28px;
    line-height: 34px;
    font-weight: ${FONTS.WEIGHT.NORMAL};
    --tw-tracking: 0.38px;
    letter-spacing: 0.38px;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${COLORS.BORDER_SUBTLE};
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

const LoginButton = styled.button`
  ${headerActionStyles}
`;

interface MainViewProps {
  sidebarOpen: boolean;
}

const MainView = ({ sidebarOpen }: MainViewProps) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const rightPanelOpen = useAppSelector((state) => state.ui.rightPanelOpen);
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);
  const messageIds = useAppSelector((state) =>
    activeChatId ? state.chat.messageIdsByChatId[activeChatId] ?? [] : []
  );
  const chatContentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleShowLogin = () => {
    dispatch(clearActiveChatId());
    dispatch(clearEngagementContext());
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
      <MainContainer
        $sidebarOpen={sidebarOpen}
        $rightPanelOpen={isAuthenticated && rightPanelOpen}
      >
        <HeaderContainer>
          <HeaderTitle>Active Research</HeaderTitle>
          {isAuthenticated ? (
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
          ) : (
            <HeaderActions>
              <LoginButton
                type="button"
                aria-label="Show sign in"
                onClick={handleShowLogin}
              >
                <FiLogIn aria-hidden />
                Log in
              </LoginButton>
            </HeaderActions>
          )}
        </HeaderContainer>
        <ToggleButton onClick={handleToggle}>☰</ToggleButton>
        {!isAuthenticated ? (
          <PlaceholderRoot>
            <PlaceholderContent>
              <MainLoginForm />
            </PlaceholderContent>
          </PlaceholderRoot>
        ) : !activeChatId ? (
          <PlaceholderRoot>
            <>
              <PlaceholderContent>
                <h1 className="header">Think clearly. Engage deeply. Stay in charge.</h1>
                <div className="underline"></div>
                {/* <p className="subheader">
                Produce work that remains recognisably and confidently your own. Every prompt counts!
              </p> */}
                <InputBox />
              </PlaceholderContent>
              <AIFactBlock />
            </>
          </PlaceholderRoot>
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
                <PassiveQuotaStrip />
                <InputBox />
              </InputBoxContent>
            </InputBoxWrapper>
          </>
        )}
      </MainContainer>
      {isAuthenticated ? <RightAgentPanel /> : null}
    </>
  );
};

export default MainView;
