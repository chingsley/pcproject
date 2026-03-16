import { useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setActiveChatId, clearActiveChatId } from '../../../store/slices/chatSlice';
import { setTotalPoints } from '../../../store/slices/userSlice';
import Header from './Header';
import { NewChat, NewChatV2 } from './NewChat';
import Points from './PointsRing/Points';
import ChatSection from './Chat/ChatSection';
import SidebarFooter from './Footer/SidebarFooter';
import { drawBorder } from '../../../utils/playground';

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
  border: ${drawBorder('green')};
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  border: ${drawBorder('yellow')};
`;

const MiddleSection = styled.div`
  flex: 1;
  // border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 28rem;
  border: ${drawBorder('yellow')};
`;

const SidebarPoints = styled.div`
  height: ${LAYOUT.SIDEBAR_POINTS_HEIGHT};
  border-bottom: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;


interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const chatIds = useAppSelector((state) => state.chat.chatIds);
  const chatsById = useAppSelector((state) => state.chat.chatsById);
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);

  // Convert to Chat array for ChatSection
  const chats = chatIds.map((id) => chatsById[id]);
  const totalPoints = chats.reduce((sum, chat) => sum + chat.points, 0);

  useEffect(() => {
    dispatch(setTotalPoints(totalPoints));
  }, [dispatch, totalPoints]);

  const handleNewChat = () => {
    dispatch(clearActiveChatId());
  };

  const handleSelectChat = (chatId: string) => {
    dispatch(setActiveChatId(chatId));
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarContent>
        <TopSection>
          <Header />
          <NewChat onClick={handleNewChat} />
          <SidebarPoints>
            <Points />
          </SidebarPoints>
        </TopSection>

        <MiddleSection />

        <BottomSection>
          <ChatSection
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
          />
          <SidebarFooter />
        </BottomSection>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

