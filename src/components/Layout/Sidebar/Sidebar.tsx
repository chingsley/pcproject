import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import SidebarToggle from './SidebarToggle';

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
`;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarContent>
        <SidebarToggle />
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
