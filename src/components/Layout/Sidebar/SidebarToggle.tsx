import styled from 'styled-components';
import { useAppDispatch } from '../../../store/hooks';
import { toggleSidebar } from '../../../store/slices/uiSlice';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { SPACING } from '../../../constants/spacing.constants';

const ToggleButton = styled.button`
  background: transparent;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  color: ${COLORS.TEXT_PRIMARY};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALL};
  cursor: pointer;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  transition: all 0.2s ease;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SidebarToggle = () => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return <ToggleButton onClick={handleToggle}>Toggle Sidebar</ToggleButton>;
};

export default SidebarToggle;
