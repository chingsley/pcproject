import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { ICONS } from '../../../../constants/icons.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import type { HistoryItemEntry } from '../../../../store/slices/historySlice';
import HistoryList from './HistoryList';

const SectionWrapper = styled.div`
  height: ${LAYOUT.SIDEBAR_HISTORY_HEIGHT};
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
`;

const CaptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.BUTTON_PADDING_X};
`;

const CaptionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

const CaptionIcon = styled.img`
  width: ${FONTS.SIZE.XLARGE};
  height: ${FONTS.SIZE.XLARGE};
  object-fit: contain;
`;

const SectionCaption = styled.p`
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.BOLD};
  color: ${COLORS.TEXT_PRIMARY};
  margin-top: ${SPACING.BUTTON_PADDING_X};
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
  text-align: center;
`;

const CaptionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

const TotalLabel = styled.span`
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.MUTED_WHITE};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const TotalValue = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  padding: 0.25rem 0.5rem;
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  color: ${COLORS.HISTORY_ITEM_POINTS_TEXT};
  background: ${COLORS.GLASS_GREEN};
  border: 1px solid rgba(110, 231, 183, 0.25);
  border-radius: ${SPACING.RADIUS_SMALLER};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2) inset;
`;

export interface HistorySectionProps {
  items: HistoryItemEntry[];
  selectedId: string | null;
  onSelectItem: (id: string) => void;
}

const HistorySection = ({ items, selectedId, onSelectItem }: HistorySectionProps) => {
  const totalPoints = items.reduce((sum, item) => sum + item.points, 0);

  return (
    <SectionWrapper>
      <CaptionWrapper>
        <CaptionLeft>
          <CaptionIcon src={ICONS.HISTORY_CAPTION_ICON} alt="" />
          <SectionCaption>HISTORY</SectionCaption>
        </CaptionLeft>
        <CaptionRight>
          <TotalLabel>Total Points</TotalLabel>
          <TotalValue>{totalPoints}</TotalValue>
        </CaptionRight>
      </CaptionWrapper>
      <HistoryList
        items={items}
        selectedId={selectedId}
        onSelectItem={onSelectItem}
      />
    </SectionWrapper>
  );
};

export default HistorySection;
