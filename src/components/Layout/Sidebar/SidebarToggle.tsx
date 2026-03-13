import styled from 'styled-components';
import { useAppDispatch } from '../../../store/hooks';
import { toggleSidebar } from '../../../store/slices/uiSlice';
import { ICONS } from '../../../constants/icons.constants';
import { LAYOUT } from '../../../constants/layout.constants';

const ToggleButton = styled.button`
  width: ${LAYOUT.SIDEBAR_TOGGLE_ICON_SIZE};
  height: ${LAYOUT.SIDEBAR_TOGGLE_ICON_SIZE};
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ToggleIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SidebarToggle = () => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <ToggleButton onClick={handleToggle} type="button" aria-label="Toggle sidebar">
      <ToggleIcon src={ICONS.SIDEBAR_TOGGLE_ICON} alt="" />
    </ToggleButton>
  );
};

export default SidebarToggle;
