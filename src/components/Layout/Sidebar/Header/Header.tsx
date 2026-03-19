import styled from 'styled-components';
import { ICONS } from '../../../../constants/icons.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import SidebarToggle from '../SidebarToggle';
import { drawBorder } from '../../../../utils/playground';

const HeaderWrapper = styled.div`
  height: ${LAYOUT.HEADER_ROW_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${drawBorder('orange')};
  padding: 0 ${LAYOUT.SIDEBAR_ITEM_X_PADDING};
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
  <HeaderWrapper>
    <HeaderRow>
      <HeaderLeft>
        <LightbulbIcon src={ICONS.LIGHTBULB_ICON} alt="" />
      </HeaderLeft>
      <SidebarToggle />
    </HeaderRow>
  </HeaderWrapper>
);

export default Header;
