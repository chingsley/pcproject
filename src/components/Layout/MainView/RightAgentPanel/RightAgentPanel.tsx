import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setRightPanelOpen } from '../../../../store/slices/uiSlice';
import { drawBorder } from '../../../../utils/playground';
import Leaderboard from '../../Leaderboard/LeaderBoard';

const Panel = styled.aside<{ $open: boolean; }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 950;
  width: min(${LAYOUT.RIGHT_PANEL_WIDTH}, 100vw);
  border-left: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  // box-shadow: -0.5rem 0 1.5rem ${COLORS.MODAL_SHADOW_SOFT};
  display: flex;
  flex-direction: column;
  transform: translateX(${(p) => (p.$open ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
  border: ${drawBorder('green')};
  border-left: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

const PanelHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.BUTTON_PADDING_X};
  min-height: ${LAYOUT.HEADER_ROW_HEIGHT};
  padding: ${SPACING.BUTTON_PADDING_Y} ${LAYOUT.LAYOUT_CONTENT_PADDING};
  border-bottom: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  // background: linear-gradient(
  //   180deg,
  //   ${COLORS.SURFACE_OVERLAY_LIGHT} 0%,
  //   ${COLORS.TRANSPARENT} 100%
  // );
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  color: ${COLORS.TEXT_PRIMARY};
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_MEDIUM};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

const PanelBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${LAYOUT.LAYOUT_CONTENT_PADDING};
  display: flex;
  flex-direction: column;
  border: ${drawBorder('yellow', true)};
`;

const RightAgentPanel = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.rightPanelOpen);

  return (
    <Panel $open={open} aria-hidden={!open}>
      <PanelHeader>
        <PanelTitle>Explorers</PanelTitle> {/* TODO: Add other leaderboard groups: level 2: Thinkers, level 3: Creators, level 4: Leaders, level 5: GateKeepers, ... */}
        <CloseButton
          type="button"
          aria-label="Close leaderboard panel"
          onClick={() => dispatch(setRightPanelOpen(false))}
        >
          <FiX size={20} aria-hidden />
        </CloseButton>
      </PanelHeader>
      <PanelBody>
        <Leaderboard />
      </PanelBody>
    </Panel>
  );
};

export default RightAgentPanel;
