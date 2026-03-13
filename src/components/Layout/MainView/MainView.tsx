import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { useAppDispatch } from '../../../store/hooks';
import { toggleSidebar } from '../../../store/slices/uiSlice';
import InputBox from './InputBox/InputBox';

const MainContainer = styled.div<{ $sidebarOpen: boolean; }>`
  margin-left: ${(props) => (props.$sidebarOpen ? LAYOUT.SIDEBAR_WIDTH : '0')};
  min-height: 100vh;
  background-color: ${COLORS.MAIN_BG};
  transition: margin-left 0.3s ease-in-out;
  padding: ${LAYOUT.PANEL_PADDING};
  display: flex;
  flex-direction: column;
  // border: 1px solid white;

  @media (max-width: ${LAYOUT.BREAKPOINTS.LARGE}) {
    margin-left: 0;
  }
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
  // border: 1px solid red;

  .header {
    font-size: ${FONTS.SIZE.XXLARGE};
  }
  .subheader {
    color: ${COLORS.MUTED_WHITE};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: ${SPACING.FIXED_OFFSET};
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

interface MainViewProps {
  sidebarOpen: boolean;
}

const MainView = ({ sidebarOpen }: MainViewProps) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <MainContainer $sidebarOpen={sidebarOpen}>
      <ToggleButton onClick={handleToggle}>☰</ToggleButton>
      <PlaceholderContent>
        <h1 className="header">Where knowledge begins</h1>
        <p className="subheader">
          Ask anything. Get instant answers, comprehensive summaries
        </p>
        <InputBox />
      </PlaceholderContent>
    </MainContainer>
  );
};

export default MainView;
