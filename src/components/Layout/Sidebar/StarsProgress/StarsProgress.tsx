import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { useAppSelector } from '../../../../store/hooks';

const StarsDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  margin-bottom: ${SPACING.BUTTON_PADDING_Y};
`;

const StarsCount = styled.span`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.XLARGEPLUS};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  color: ${COLORS.STAR_ACCENT};
`;

const StarSymbol = styled.span`
  font-size: ${FONTS.SIZE.XLARGEPLUS};
  color: ${COLORS.STAR_ACCENT};
  line-height: 1;
`;

const MotivatingText = styled.p`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.MUTED_WHITE};
  line-height: 1.4;
  margin: 0;
  max-width: 14rem;
`;

const StarsProgress = () => {
  const { starsCount, nextStarTarget, totalPoints } = useAppSelector((state) => state.user);
  const pointsAway = nextStarTarget - totalPoints;

  return (
    <>
      <StarsDisplay>
        <StarsCount>{starsCount}</StarsCount>
        <StarSymbol aria-hidden>★</StarSymbol>
      </StarsDisplay>
      <MotivatingText>
        {starsCount === 0
          ? `You are ${pointsAway} points away from earning your first star`
          : `You are ${pointsAway} points away from earning your next star`}
      </MotivatingText>
    </>
  );
};

export default StarsProgress;
