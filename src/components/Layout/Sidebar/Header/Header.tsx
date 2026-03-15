import styled from 'styled-components';
import { ICONS } from '../../../../constants/icons.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import SidebarToggle from '../SidebarToggle';
import { drawBorder } from '../../../../utils/playground';

const SidebarHeader = styled.div`
  height: ${LAYOUT.HEADER_ROW_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${drawBorder('white')};
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.BUTTON_PADDING_X};
  border: ${drawBorder('blue')};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.175rem;
  min-width: 0;
`;

const LightbulbIcon = styled.img`
  height: 2.2rem;
  width: auto;
  object-fit: contain;
  object-position: bottom;
  flex-shrink: 0;
  display: block;
  vertical-align: bottom;
`;

const Header = () => (
  <SidebarHeader>
    <HeaderRow>
      <HeaderLeft>
        <LightbulbIcon src={ICONS.LIGHTBULB_ICON} alt="" />
      </HeaderLeft>
      <SidebarToggle />
    </HeaderRow>
  </SidebarHeader>
);

export default Header;
