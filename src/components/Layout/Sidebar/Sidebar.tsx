import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setActiveChatId, clearActiveChatId } from '../../../store/slices/chatSlice';
import { clearEngagementContext } from '../../../store/slices/uiSlice';
import { selectChatsWithPoints } from '../../../store/selectors/chatSelectors';
import Header from './Header';
import { NewChat } from './NewChat';
import Points from './PointsRing/Points';
import StarsProgress from './StarsProgress/StarsProgress';
import ChatSection from './Chat/ChatSection';
import SidebarFooter from './Footer/SidebarFooter';
import { drawBorder } from '../../../utils/playground';
import { SPACING } from '../../../constants/spacing.constants';

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
  padding: ${LAYOUT.LAYOUT_CONTENT_PADDING};
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${LAYOUT.LAYOUT_CONTENT_PADDING};
  text-align: center;
  border: ${drawBorder('yellow')};
  // border-top: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  // border-bottom: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 28rem;
  border: ${drawBorder('yellow')};
`;


interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectChatsWithPoints);
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);

  const handleNewChat = () => {
    dispatch(clearActiveChatId());
    dispatch(clearEngagementContext());
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
          <Points />
        </TopSection>

        <MiddleSection>
          <StarsProgress />
        </MiddleSection>

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

